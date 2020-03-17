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
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LancetApp.Core.Service
{
    public class TestService : ITestService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly string _userId;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public TestService(IMapper mapper, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager, ApplicationDbContext dbContext)
        {
            this._userManager = _userManager;
            _dbContext = dbContext;
            _mapper = mapper;
            _userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        public async Task<TestDto> Get(Guid id)
        {
            try
            {
                var test = await _dbContext.Tests.FirstAsync(p => p.Id == id);
                var testDto = _mapper.Map<TestDto>(test);
                return testDto;
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
            DataTableData<TestDto> dataTableData = new DataTableData<TestDto>();
            try
            {
                var query = _dbContext.Tests.Select(x => new TestDto
                {
                    Name=x.Name,
                    Comment=x.Comment,
                    NormalValue= _mapper.Map<NormalRangeDto>(x.NormalValue),//MapAddress(x.Address),
                    NormalValueId =x.NormalValueId,
                    TestResult= _mapper.Map<TestResultDto>(x.TestResult),
                    TestResultId=x.TestResultId,
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
                if (totalCount>0 &&(!string.IsNullOrEmpty(dataItems.Search) || !string.IsNullOrWhiteSpace(dataItems.Search)))
                {
                    var value = dataItems.Search.Trim();
                    query = query.Where(p => p.Name.Contains(value));
                }
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
        public async Task<Guid> AddTest(TestDto testData)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(_userId);
                var test = _mapper.Map<Test>(testData);
                _dbContext.Tests.Add(test);
                await _dbContext.SaveChangesAsync();
                return test.Id;
            }
            catch (Exception e)
            {
                return Guid.Empty;
            }
        }
        public async Task<IEnumerable<TestDto>> GetAll()
        {
            try
            {
                List<TestDto> list = await _dbContext.Tests.Select(x => new TestDto
                {
                    NormalValue = _mapper.Map<NormalRangeDto>(x.NormalValue),
                    TestResult = _mapper.Map<TestResultDto>(x.TestResult),
                    Name = x.Name,
                    TestResultId = x.TestResultId,
                    Comment=x.Comment,
                    NormalValueId=x.NormalValueId,
                    Id = x.Id
                }).ToListAsync();
                return list;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public async Task<bool> RemoveTest(Guid id)
        {
            try
            {
                var test = _dbContext.Tests.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (test == null)
                {
                    return false;
                }
                var testToRemove = _mapper.Map<Test>(test);
                _dbContext.Entry(testToRemove).State = EntityState.Deleted;
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public async Task<Guid> UpdateTest(TestDto testData)
        {
            try
            {
                var savedTest = _dbContext.Tests.AsNoTracking().FirstOrDefault(p => p.Id == testData.Id);
                if (savedTest == null)
                {
                    return Guid.Empty;
                }
                _dbContext.Entry(_mapper.Map<Test>(testData)).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return savedTest.Id;
            }
            catch (Exception e)
            {
                return Guid.Empty;
            }
        }
    }
}
