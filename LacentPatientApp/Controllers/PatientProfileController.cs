using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using LancetApp.Common.Config;
using LancetApp.Common.DTOs;
using LancetApp.Core.Abstraction;
using LancetApp.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
namespace LancetApp.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PatientProfileController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;
        private readonly string _userId;
        private readonly IHttpContextAccessor _httpContextAccessor = null;
        private readonly IPatientProfileService _patientProfileService;
        private readonly IPatientService _patientService;
        private readonly IMapper _mapper;

        public PatientProfileController(IPatientService patientService, IPatientProfileService patientProfileService, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager,
            SignInManager<IdentityUser> _signInManager, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            this._userManager = _userManager;
            this._signInManager = _signInManager;
            _appSettings = appSettings.Value;
            _httpContextAccessor = httpContextAccessor;
            _patientProfileService = patientProfileService;
            _mapper = mapper;
            _patientService = patientService;
        }
        [HttpPost("add")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> AddPatientProfile([FromBody]PatientProfileViewModel formdata)
        {
            try
            {
                if (formdata == null)
                {
                    return BadRequest(new JsonResult(new { message = "object sent from client is null." }));
                }
                else if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object sent from client.");
                }
                var patientProfile = _mapper.Map<PatientProfileDto>(formdata);
                var patientProfileData = await _patientProfileService.AddPatientProfile(patientProfile);

                if (patientProfileData==Guid.Empty) 
                {
                    return NotFound();
                }
                patientProfile.Id = patientProfileData;
                var addedPatientProfile = _mapper.Map<PatientProfileViewModel>(patientProfile);
                return CreatedAtAction(nameof(GetPatientProfile), new { id = patientProfileData }, addedPatientProfile);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Something went wrong inside add patientProfile action: {e.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientProfile(Guid id)
        {
            try
            {
                var patientProfile = await _patientProfileService.Get(id);
                if (patientProfile == null)
                    return NotFound();

                return Ok(patientProfile);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = e.Message }));
            }
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdatePatientProfile(Guid id, [FromBody]PatientProfileViewModel formdata)
        {
            try
            {

                if (formdata == null)
                {
                    return BadRequest(new JsonResult(new { message = "object sent from client is null." }));
                }
                if (id == null || id==Guid.Empty)
                {
                    return BadRequest(new JsonResult(new { message = "object sent from client is null." }));
                }
                if (id != formdata.Id)
                {
                    return BadRequest(new JsonResult(new { message = "please ensure you are updating right object" }));
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object sent from client.");
                }
                var patientProfile = _mapper.Map<PatientProfileDto>(formdata);
                var patientProfileId=await _patientProfileService.UpdatePatientProfile(patientProfile);
                if (patientProfileId == Guid.Empty) 
                {
                    return NotFound();
                }
                patientProfile.Id = patientProfileId;
                return CreatedAtAction(nameof(GetPatientProfile), new { id = patientProfileId}, _mapper.Map<PatientProfileViewModel>(patientProfile));
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside update patientProfile action: {e.Message}" }));
            }
        }
        [HttpDelete("remove/{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> RemovePatientProfile(Guid id)
        {
            try
            {
                var removed =await _patientProfileService.RemovePatientProfile(id);
                if (!removed)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the remove patientProfile action: {e.Message}" }));
            }
        }
        [HttpGet("getall")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll(int draw=0, int start=0, int length=0,string search="") =>
            length  == 0 && draw==0 && search=="" && start==0 ? await GetAllPatientProfiles() : await GetAllPatientProfiles(new DatatableParametersViewModel { Draw = draw, Search = search, Start = start, Length = length });
        private async Task<IActionResult> GetAllPatientProfiles(DatatableParametersViewModel dataTableParameters)
        {
            try
            {
                var result = await _patientProfileService.GetAll(_mapper.Map<DatatableParametersDto>(dataTableParameters));
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall patientProfiles action: {e.Message}" }));
            }
        }
        private async Task<IActionResult> GetAllPatientProfiles()
        {
            try
            {
                var result = await _patientProfileService.GetAll();
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall patientProfiles action: {e.Message}" }));
            }
        }
        public async Task<string> UploadProfilePicture([FromForm(Name = "uploadedFile")] IFormFile file, long userId)
        {
            if (file == null || file.Length == 0)
            {//   throw new UserFriendlyException("Please select profile picture");
            }

            var folderName = Path.Combine("Resources", "ProfilePics");
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            var uniqueFileName = $"{userId}_profilepic.png";
            var dbPath = Path.Combine(folderName, uniqueFileName);

            using (var fileStream = new FileStream(Path.Combine(filePath, uniqueFileName), FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return dbPath;
        }
    }
}