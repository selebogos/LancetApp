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
    public class PatientProfileService: IPatientProfileService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly string _userId;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public PatientProfileService(IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager, ApplicationDbContext dbContext)
        {
            this._userManager = _userManager;
            _dbContext = dbContext;
            _mapper = mapper;
            _userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        public async Task<PatientProfileDto> Get(Guid id)
        {
            try
            {
                var patientProfile = await _dbContext.PatientProfiles.FirstAsync(p => p.Id == id);
                var patientProfileDto = _mapper.Map<PatientProfileDto>(patientProfile);
                return patientProfileDto;
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
            DataTableData<PatientProfileDto> dataTableData = new DataTableData<PatientProfileDto>();
            try
            {
                var query = _dbContext.PatientProfiles.Select(x => new PatientProfileDto
                {
                    Requisitions = _mapper.Map<ICollection<Requisition>, ICollection<RequisitionDto>>(x.Requisitions),//MapAddress(x.Address),
                    PatientId = x.PatientId,
                    Patient = _mapper.Map<PatientDto>(x.Patient),
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
                var data = await query.ToListAsync();
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
        public async Task<Guid> AddPatientProfile(PatientProfileDto patientProfileData)
        {
            try
            {
                if (await PatientHasBusinessProfile(patientProfileData.PatientId))
                {
                    return Guid.Empty;
                }
                var user = await _userManager.FindByEmailAsync(_userId);
                var patientProfile = _mapper.Map<PatientProfile>(patientProfileData);
                _dbContext.PatientProfiles.Add(patientProfile);
                await _dbContext.SaveChangesAsync();
                return patientProfile.Id;
            }
            catch (Exception)
            {
                return Guid.Empty;
            }
        }
        public async Task<IEnumerable<PatientProfileDto>> GetAll()
        {
            try
            {
                List<PatientProfileDto> list = await _dbContext.PatientProfiles.Select(x => new PatientProfileDto
                {
                    Requisitions = _mapper.Map<ICollection<Requisition>, ICollection<RequisitionDto>>(x.Requisitions),//MapAddress(x.Address),
                    PatientId = x.PatientId,
                    Patient = _mapper.Map<PatientDto>(x.Patient),
                    Id = x.Id
                }).ToListAsync();
                return list;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public async Task<bool> RemovePatientProfile(Guid id)
        {
            try
            {
                var patientProfile = _dbContext.PatientProfiles.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (patientProfile == null)
                {
                    return false;
                }
                var patientProfileToRemove = _mapper.Map<PatientProfile>(patientProfile);
                _dbContext.Entry(patientProfileToRemove).State = EntityState.Deleted;
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public async Task<Guid> UpdatePatientProfile(PatientProfileDto patientProfileData)
        {
            try
            {
                var savedPatientProfile = _dbContext.PatientProfiles.AsNoTracking().FirstOrDefault(p => p.Id == patientProfileData.Id);
                if (savedPatientProfile == null)
                {
                    return Guid.Empty;
                }
                _dbContext.Entry(_mapper.Map<PatientProfile>(patientProfileData)).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return savedPatientProfile.Id;
            }
            catch (Exception e)
            {
                return Guid.Empty;
            }
        }
        public async Task<bool> PatientHasBusinessProfile(Guid patientId)
        {
            try
            {
                var patientProfile = await _dbContext.PatientProfiles.FirstOrDefaultAsync(p => p.PatientId == patientId);
                if (patientProfile == null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
