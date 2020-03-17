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
    public class TestController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;
        private readonly string _userId;
        private readonly IHttpContextAccessor _httpContextAccessor = null;
        private readonly ITestService _testService;
        private readonly IMapper _mapper;

        public TestController(ITestService testService, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager,
            SignInManager<IdentityUser> _signInManager, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            this._userManager = _userManager;
            this._signInManager = _signInManager;
            _appSettings = appSettings.Value;
            _httpContextAccessor = httpContextAccessor;
            _testService = testService;
            _mapper = mapper;
        }
        [HttpPost("add")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> AddTest([FromBody]TestViewModel formdata)
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
                var test = _mapper.Map<TestDto>(formdata);
                var testData = await _testService.AddTest(test);

                if (testData==Guid.Empty) 
                {
                    return NotFound();
                }
                test.Id = testData;
                var addedTest = _mapper.Map<TestViewModel>(test);
                return CreatedAtAction(nameof(GetTest), new { id = testData }, addedTest);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Something went wrong inside add test action: {e.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTest(Guid id)
        {
            try
            {
                var test = await _testService.Get(id);
                if (test == null)
                    return NotFound();

                return Ok(test);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = e.Message }));
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateTest(Guid id, [FromBody]TestViewModel formdata)
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
                var test = _mapper.Map<TestDto>(formdata);
                var testId=await _testService.UpdateTest(test);
                if (testId == Guid.Empty) 
                {
                    return NotFound();
                }
                test.Id = testId;
                return CreatedAtAction(nameof(GetTest), new { id = testId}, _mapper.Map<TestViewModel>(test));
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside update test action: {e.Message}" }));
            }
        }
        [HttpDelete("remove/{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> RemoveTest(Guid id)
        {
            try
            {
                var removed =await _testService.RemoveTest(id);
                if (!removed)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the remove test action: {e.Message}" }));
            }
        }
        [HttpGet("getall")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll(int draw=0, int start=0, int length=0,string search="") =>
            length  == 0 && draw==0 && search=="" && start==0 ? await GetAllTests() : await GetAllTests(new DatatableParametersViewModel { Draw = draw, Search = search, Start = start, Length = length });
        private async Task<IActionResult> GetAllTests(DatatableParametersViewModel dataTableParameters)
        {
            try
            {
                var result = await _testService.GetAll(_mapper.Map<DatatableParametersDto>(dataTableParameters));
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall tests action: {e.Message}" }));
            }
        }
        private async Task<IActionResult> GetAllTests()
        {
            try
            {
                var result = await _testService.GetAll();
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall tests action: {e.Message}" }));
            }
        }
    }
}