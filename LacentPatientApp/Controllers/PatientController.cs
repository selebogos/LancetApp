using System;
using System.Collections.Generic;
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
using Newtonsoft.Json;

namespace LancetApp.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;
        private readonly string _userId;
        private readonly IHttpContextAccessor _httpContextAccessor = null;
        private readonly IPatientService _patientService;
        private readonly IMapper _mapper;

        public PatientController(IPatientService patientService, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager,
            SignInManager<IdentityUser> _signInManager, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            this._userManager = _userManager;
            this._signInManager = _signInManager;
            _appSettings = appSettings.Value;
            _httpContextAccessor = httpContextAccessor;
            _patientService = patientService;
            _mapper = mapper;
        }
        [HttpPost("add")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> AddPatient([FromBody]PatientViewModel formdata)
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
                var patient = _mapper.Map<PatientDto>(formdata);
                var patientData = await _patientService.AddPatient(patient);

                if (patientData.Item1==Guid.Empty) 
                {
                    return NotFound();
                }
                patient.Id = patientData.Item1;
                patient.CreatedBy = patientData.Item2;
                var addedPatient = _mapper.Map<PatientViewModel>(patient);
                return CreatedAtAction(nameof(GetPatient), new { id = patientData.Item1 }, addedPatient);
            }   
            catch (Exception e)
            {
                return StatusCode(500, $"Something went wrong inside add patient action: {e.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatient(Guid id)
        {
            try
            {
                var patient = await _patientService.Get(id);
                if (patient == null)
                    return NotFound();

                return Ok(patient);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = e.Message }));
            }
        }
        [HttpGet("search")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> GetPatientByName(string name)
        {
            try
            {
                var patient = await _patientService.SearchByName(name);
                if (patient == null)
                    return NotFound();

                return Ok(patient);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = e.Message }));
            }
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdatePatient(Guid id, [FromBody]PatientViewModel formdata)
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
                if (id !=formdata.Id)
                {
                    return BadRequest(new JsonResult(new { message = "please ensure you are updating right patient"}));
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object sent from client.");
                }
                var patient = _mapper.Map<PatientDto>(formdata);
                var patientId=await _patientService.UpdatePatient(patient);
                if (patientId == Guid.Empty) 
                {
                    return NotFound();
                }
                patient.Id = patientId;
                return CreatedAtAction(nameof(GetPatient), new { id = patientId}, _mapper.Map<PatientViewModel>(patient));
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside update patient action: {e.Message}" }));
            }
        }
        [HttpDelete("remove/{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> RemovePatient(Guid id)
        {
            try
            {
                var removed =await _patientService.RemovePatient(id);
                if (!removed)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the remove patient action: {e.Message}" }));
            }
        }
        [HttpGet("getall")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll(int draw=0, int start=0, int length=0,string search="") =>
            length  == 0 && draw==0 && search=="" && start==0 ? await GetAllPatients() : await GetAllPatients(new DatatableParametersViewModel { Draw = draw, Search = search, Start = start, Length = length });
        private async Task<IActionResult> GetAllPatients(DatatableParametersViewModel dataTableParameters)
        {
            try
            {
                var result = await _patientService.GetAll(_mapper.Map<DatatableParametersDto>(dataTableParameters));
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall patients action: {e.Message}" }));
            }
        }
        private async Task<IActionResult> GetAllPatients()
        {
            try
            {
                var result = await _patientService.GetAll();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall patients action: {e.Message}" }));
            }
        }
    }
}