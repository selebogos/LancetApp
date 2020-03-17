using AutoMapper;
using LancetApp.Common.Config;
using LancetApp.Common.DTOs;
using LancetApp.Core.Abstraction;
using LancetApp.DAL.DBContext;
using LancetApp.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LancetApp.Core.Service
{
    public class RequisitionService : IRequisitionService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly string _userId;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public RequisitionService(IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager, ApplicationDbContext dbContext)
        {
            this._userManager = _userManager;
            _dbContext = dbContext;
            _mapper = mapper;
            _userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        public async Task<RequisitionDto> Get(Guid id)
        {
            try
            {
                var requisition = await _dbContext.Requisitions.FirstAsync(p => p.Id == id);
                var requisitionDto = _mapper.Map<RequisitionDto>(requisition);
                return requisitionDto;
            }
            catch (Exception e)
            {

                return null;
            }
        }
        public async Task<string> GetAll(DatatableParametersDto dataItems)
        {
            string output = "";
            string error = "";
            DataTableData<RequisitionDto> dataTableData = new DataTableData<RequisitionDto>();
            try
            {
                var query = _dbContext.Requisitions.Select(x => new RequisitionDto
                {
                    ReferringPhysician=x.ReferringPhysician,
                    DateSubmitted=x.DateSubmitted,
                    //Tests = _mapper.Map<ICollection<Test>, ICollection<TestDto>>(x.Tests),//MapAddress(x.Address),
                    ProfileId = x.ProfileId,
                    //Profile = _mapper.Map<PatientProfileDto>(x.Profile),
                    Id = x.Id
                });

                var totalCount = query.Count();
                int sortColumn = -1;
                string sortDirection = "asc";

                if (dataItems.Length <= 0)
                {
                    dataItems.Length = totalCount;
                }
                if (dataItems.Draw <= 0)
                {
                    dataItems.Draw = 10;
                }
                if (dataItems.Start <= -1)
                {
                    dataItems.Start = 0;
                }

                dataTableData.draw = dataItems.Draw;
                dataTableData.recordsTotal = totalCount;
                // Paging
                if (dataItems.Length != totalCount)
                    query = query.Skip(dataItems.Start).Take(dataItems.Length);
                //Search
                // Apply filters
                /*if (!string.IsNullOrEmpty(dataItems.Search) || !string.IsNullOrWhiteSpace(dataItems.Search))
                {
                    var value = dataItems.Search.Trim();
                    query = query.Where(p => p..ToString().Contains(value));
                }*/
                var data = await query.Select(x=>new RequisitionDto { Id=x.Id,DateSubmitted=x.DateSubmitted,ReferringPhysician=x.ReferringPhysician}).ToListAsync();
                dataTableData.recordsFiltered = totalCount;
                dataTableData.data = data;
                output = JsonConvert.SerializeObject(dataTableData, Formatting.Indented);
            }
            catch (Exception ex)
            {
                error = ex.Message;

            }
            return output;
        }
        public async Task<Guid> AddRequisition(RequisitionDto requisitionData)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(_userId);
                var requisition = _mapper.Map<Requisition>(requisitionData);
                _dbContext.Requisitions.Add(requisition);
                await _dbContext.SaveChangesAsync();
                return requisition.Id;
            }
            catch (Exception e)
            {
                return Guid.Empty;
            }
        }
        public async Task<IEnumerable<RequisitionDto>> GetAll()
        {
            try
            {
                List<RequisitionDto> list = await _dbContext.Requisitions.Select(x => new RequisitionDto
                {
                    Tests = _mapper.Map<ICollection<Test>, ICollection<TestDto>>(x.Tests),//MapAddress(x.Address),
                    ProfileId = x.ProfileId,
                    Profile = _mapper.Map<PatientProfileDto>(x.Profile),
                    Id = x.Id
                }).ToListAsync();
                return list;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public async Task<bool> RemoveRequisition(Guid id)
        {
            try
            {
                var requisition = _dbContext.Requisitions.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (requisition == null)
                {
                    return false;
                }
                var requisitionToRemove = _mapper.Map<Requisition>(requisition);
                _dbContext.Entry(requisitionToRemove).State = EntityState.Deleted;
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public async Task<Guid> UpdateRequisition(RequisitionDto requisitionData)
        {
            try
            {
                var savedRequisition = _dbContext.Requisitions.AsNoTracking().FirstOrDefault(p => p.Id == requisitionData.Id);
                if (savedRequisition == null)
                {
                    return Guid.Empty;
                }
                _dbContext.Entry(_mapper.Map<Requisition>(requisitionData)).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return savedRequisition.Id;
            }
            catch (Exception e)
            {
                return Guid.Empty;
            }
        }
    }
}
