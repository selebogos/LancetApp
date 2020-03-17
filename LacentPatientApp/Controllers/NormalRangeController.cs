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
    public class NormalRangeController : ControllerBase
    {
        private readonly INormalRangeService _normalRangeService;
        private readonly IMapper _mapper;

        public NormalRangeController(INormalRangeService normalRangeService, IMapper mapper)
        {
            _normalRangeService = normalRangeService;
            _mapper = mapper;
        }
        [HttpPost("add")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> AddNormalRange([FromBody]NormalRangeViewModel formdata)
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
                var normalRange = _mapper.Map<NormalRangeDto>(formdata);
                var normalRangeData = await _normalRangeService.AddNormalRange(normalRange);

                if (normalRangeData==-1) 
                {
                    return NotFound();
                }
                normalRange.Id = normalRangeData;
                var addedNormalRange = _mapper.Map<NormalRangeViewModel>(normalRange);
                return CreatedAtAction(nameof(GetNormalRange), new { id = normalRangeData }, addedNormalRange);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Something went wrong inside add NormalRange action: {e.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNormalRange(int id)
        {
            try
            {
                var normalRange = await _normalRangeService.Get(id);
                if (normalRange == null)
                    return NotFound();

                return Ok(normalRange);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = e.Message }));
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateNormalRange(int id, [FromBody]NormalRangeViewModel formdata)
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
                var normalRange = _mapper.Map<NormalRangeDto>(formdata);
                var normalRangeId=await _normalRangeService.UpdateNormalRange(normalRange);
                if (normalRangeId == -1) 
                {
                    return NotFound();
                }
                normalRange.Id = normalRangeId;
                return CreatedAtAction(nameof(GetNormalRange), new { id = normalRangeId}, _mapper.Map<NormalRangeViewModel>(normalRange));
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside update NormalRange action: {e.Message}" }));
            }
        }
        [HttpDelete("remove/{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> RemoveNormalRange(int id)
        {
            try
            {
                var removed =await _normalRangeService.RemoveNormalRange(id);
                if (!removed)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the remove NormalRange action: {e.Message}" }));
            }
        }
        [HttpGet("getall")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll(int draw=0, int start=0, int length=0,string search="") =>
            length  == 0 && draw==0 && search=="" && start==0 ? await GetAllNormalRanges() : await GetAllNormalRanges(new DatatableParametersViewModel { Draw = draw, Search = search, Start = start, Length = length });
        private async Task<IActionResult> GetAllNormalRanges(DatatableParametersViewModel dataTableParameters)
        {
            try
            {
                var result = await _normalRangeService.GetAll(_mapper.Map<DatatableParametersDto>(dataTableParameters));
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall NormalRange action: {e.Message}" }));
            }
        }
        private async Task<IActionResult> GetAllNormalRanges()
        {
            try
            {
                var result = await _normalRangeService.GetAll();
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall NormalRange action: {e.Message}" }));
            }
        }
    }
}