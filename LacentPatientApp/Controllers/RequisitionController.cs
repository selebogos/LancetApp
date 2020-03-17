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
    public class RequisitionController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;
        private readonly string _userId;
        private readonly IHttpContextAccessor _httpContextAccessor = null;
        private readonly IRequisitionService _requisitionService;
        private readonly IMapper _mapper;

        public RequisitionController(IRequisitionService requisitionService, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager,
            SignInManager<IdentityUser> _signInManager, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            this._userManager = _userManager;
            this._signInManager = _signInManager;
            _appSettings = appSettings.Value;
            _httpContextAccessor = httpContextAccessor;
            _requisitionService = requisitionService;
            _mapper = mapper;
        }
        [HttpPost("add")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> AddRequisition([FromBody]RequisitionViewModel formdata)
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
                var requisition = _mapper.Map<RequisitionDto>(formdata);
                var requisitionData = await _requisitionService.AddRequisition(requisition);

                if (requisitionData==Guid.Empty) 
                {
                    return NotFound();
                }
                requisition.Id = requisitionData;
                var addedRequisition = _mapper.Map<RequisitionViewModel>(requisition);
                return CreatedAtAction(nameof(GetRequisition), new { id = requisitionData }, addedRequisition);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Something went wrong inside add requisition action: {e.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequisition(Guid id)
        {
            try
            {
                var requisition = await _requisitionService.Get(id);
                if (requisition == null)
                    return NotFound();

                return Ok(requisition);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = e.Message }));
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRequisition(Guid id, [FromBody]RequisitionViewModel formdata)
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
                var requisition = _mapper.Map<RequisitionDto>(formdata);
                var requisitionId=await _requisitionService.UpdateRequisition(requisition);
                if (requisitionId == Guid.Empty) 
                {
                    return NotFound();
                }
                requisition.Id = requisitionId;
                return CreatedAtAction(nameof(GetRequisition), new { id = requisitionId}, _mapper.Map<RequisitionViewModel>(requisition));
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside update requisition action: {e.Message}" }));
            }
        }
        [HttpDelete("remove/{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> RemoveRequisition(Guid id)
        {
            try
            {
                var removed =await _requisitionService.RemoveRequisition(id);
                if (!removed)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the remove requisition action: {e.Message}" }));
            }
        }
        [HttpGet("getall")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll(int draw=0, int start=0, int length=0,string search="") =>
            length  == 0 && draw==0 && search=="" && start==0 ? await GetAllRequisitions() : await GetAllRequisitions(new DatatableParametersViewModel { Draw = draw, Search = search, Start = start, Length = length });
        private async Task<IActionResult> GetAllRequisitions(DatatableParametersViewModel dataTableParameters)
        {
            try
            {
                var result = await _requisitionService.GetAll(_mapper.Map<DatatableParametersDto>(dataTableParameters));
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall requisitions action: {e.Message}" }));
            }
        }
        private async Task<IActionResult> GetAllRequisitions()
        {
            try
            {
                var result = await _requisitionService.GetAll();
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, new JsonResult(new { message = $"Something went wrong inside the getall requisitions action: {e.Message}" }));
            }
        }

    }
}