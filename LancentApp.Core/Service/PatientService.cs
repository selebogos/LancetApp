using AutoMapper;
using LancetApp.Common.Config;
using LancetApp.Common.DTOs;
using LancetApp.Core.Abstraction;
using LancetApp.DAL.DBContext;
using LancetApp.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace LancetApp.Core.Service
{

    public class PatientService : IPatientService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;
        private readonly string _userId;
        private readonly IHttpContextAccessor _httpContextAccessor = null;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IPatientProfileService _patientProfileService;

        public PatientService(IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager,
            SignInManager<IdentityUser> _signInManager, IOptions<AppSettings> appSettings, IPatientProfileService patientProfileService,
            ApplicationDbContext dbContext)
        {
            this._userManager = _userManager;
            this._signInManager = _signInManager;
            _appSettings = appSettings.Value;
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
            _mapper = mapper;
            _userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            _patientProfileService = patientProfileService;
        }
        public async Task<PatientDto> Get(Guid id)
        {
            try
            {
                var patient = await _dbContext.Patients.FirstAsync(p => p.Id == id);
                var patientDto = _mapper.Map<PatientDto>(patient);
                patientDto.CreatedBy = patient.User.Email;
                return patientDto;
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
            DataTableData<PatientDto> dataTableData = new DataTableData<PatientDto>();
            try
            {
                var query = (from patient in _dbContext.Patients
                            join user in _dbContext.Users
                            on patient.AddedById equals user.Id
                            select new PatientDto
                {
                    Address = patient.Address,
                    FullName = patient.FullName,
                    CreatedBy = patient.User.Email,
                    Id = patient.Id
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
                if (dataItems.Length !=totalCount)
                    query = query.Skip(dataItems.Start).Take(dataItems.Length);
                //Search
                // Apply filters
                if (totalCount > 0 && (!string.IsNullOrEmpty(dataItems.Search) || !string.IsNullOrWhiteSpace(dataItems.Search)))
                {
                    var value = dataItems.Search.Trim();
                    query = query.Where(p => p.FullName.Contains(value));
                }
                var data =await query.ToListAsync();
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
        public async Task<Tuple<Guid, string>> AddPatient(PatientDto patientData)
        { 
            try
            {
                var user = await _userManager.FindByEmailAsync(_userId);
                var patient = _mapper.Map<Patient>(patientData);
                patient.AddedById = user.Id;
                _dbContext.Patients.Add(patient);
                _dbContext.PatientProfiles.Add(new PatientProfile { PatientId=patient.Id});
                await _dbContext.SaveChangesAsync();
                return new Tuple<Guid, string>(patient.Id,patient.User.Email);
            }
            catch (Exception)
            {
               return new Tuple<Guid, string>(Guid.Empty, string.Empty);
            }
        }
        public async Task<IEnumerable<PatientDto>> GetAll()
        {
            try
            {
                List<PatientDto> list = await _dbContext.Patients.Select(x => new PatientDto
                {
                    Address = x.Address,
                    FullName = x.FullName,
                    CreatedBy = x.User.Email,
                    Id = x.Id
                }).ToListAsync();
                return list;
            }
            catch (Exception e)
            {

                return null;
            }
        }

        public async Task<bool> RemovePatient(Guid id)
        {
            try
            {
                var patient = _dbContext.Patients.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (patient == null) 
                {
                    return false;
                }
                var patientToRemove= _mapper.Map<Patient>(patient);
                _dbContext.Entry(patientToRemove).State = EntityState.Deleted;
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<Guid> UpdatePatient(PatientDto patientData)
        {
            try
            {
                var savedPatient = _dbContext.Patients.AsNoTracking().FirstOrDefault(p => p.Id == patientData.Id);
                if (savedPatient == null)
                {
                    return Guid.Empty;
                }
                patientData.AddedById = savedPatient.AddedById;
                _dbContext.Entry(_mapper.Map<Patient>(patientData)).State=EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return savedPatient.Id;
            }
            catch (Exception e)
            {
                return Guid.Empty;
            }
        }

        public async Task<List<PatientProfileDataDto>> SearchByName(string name)
        {
            try
            {
                var patients =await (from patient in _dbContext.Patients
                               join profile in _dbContext.PatientProfiles
                               on patient.Id equals profile.PatientId
                               where patient.FullName.Contains(name)
                               select new PatientProfileDataDto { patientId=patient.Id,profileId=profile.Id,FullName=patient.FullName}).ToListAsync();
                return patients;
            }
            catch (Exception e)
            {

                return null;
            }
        }
    }
}
