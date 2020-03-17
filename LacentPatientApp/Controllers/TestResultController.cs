using System;
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
    public class TestResultController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;
        private readonly string _userId;
        private readonly IHttpContextAccessor _httpContextAccessor = null;
        private readonly ITestResultService _testResultService;
        private readonly IMapper _mapper;

        public TestResultController(ITestResultService testresultService, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager,
            SignInManager<IdentityUser> _signInManager, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            this._userManager = _userManager;
            this._signInManager = _signInManager;
            _appSettings = appSettings.Value;
            _httpContextAccessor = httpContextAccessor;
            _testResultService = testresultService;
            _mapper = mapper;
        }
        [HttpPost("add")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> AddTestResult([FromBody]TestResultViewModel formdata)
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
                var testResult = _mapper.Map<TestResultDto>(formdata);
                var testResultData = await _testResultService.AddTestResult(testResult);

                if (testResultData==-1) 
                {
                    return NotFound();
                }
                testResult.Id = testResultData;
                var addedTestresult = _mapper.Map<TestResultViewModel>(testResult);
                return CreatedAtAction(nameof(GetTestResult), new { id = testResultData }, addedTestresult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Something went wrong inside add testresult action: {e.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTestResult(int id)
        {
            try
            {
                var testResult = await _testResultService.Get(id);
                if (testResult == null)
                    return NotFound();

                return Ok(testResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = e.Message }));
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateTestResult(int id, [FromBody]TestResultViewModel formdata)
        {
            try
            {

                if (formdata == null)
                {
                    return BadRequest(new JsonResult(new { message = "object sent from client is null." }));
                }
                if (id <=0)
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
                var testResult = _mapper.Map<TestResultDto>(formdata);
                var testResultId=await _testResultService.UpdateTestResult(testResult);
                if (testResultId == -1) 
                {
                    return NotFound();
                }
                testResult.Id = testResultId;
                return CreatedAtAction(nameof(GetTestResult), new { id = testResultId}, _mapper.Map<TestResultViewModel>(testResult));
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside update TestResult action: {e.Message}" }));
            }
        }
        [HttpDelete("remove/{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> RemoveTestResult(int id)
        {
            try
            {
                var removed =await _testResultService.RemoveTestResult(id);
                if (!removed)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the remove TestResult action: {e.Message}" }));
            }
        }
        [HttpGet("getall")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll(int draw=0, int start=0, int length=0,string search="") =>
            length  == 0 && draw==0 && search=="" && start==0 ? await GetAllTestResults() : await GetAllTestResults(new DatatableParametersViewModel { Draw = draw, Search = search, Start = start, Length = length });
        private async Task<IActionResult> GetAllTestResults(DatatableParametersViewModel dataTableParameters)
        {
            try
            {
                var result = await _testResultService.GetAll(_mapper.Map<DatatableParametersDto>(dataTableParameters));
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall testresults action: {e.Message}" }));
            }
        }
        private async Task<IActionResult> GetAllTestResults()
        {
            try
            {
                var result = await _testResultService.GetAll();
                if (result == null)
                {
                    return BadRequest();
                }

                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall testresults action: {e.Message}" }));
            }
        }
    }
}