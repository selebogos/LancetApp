using AutoMapper;
using LancetApp.Common.Config;
using LancetApp.Common.DTOs;
using LancetApp.Core.Abstraction;
using LancetApp.DAL.DBContext;
using LancetApp.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace LancetApp.Core.Service
{
    public class TestResultService : ITestResultService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public TestResultService(IMapper mapper,
            ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<TestResultDto> Get(int id)
        {
            try
            {
                var result = await _dbContext.TestResults.FirstAsync(p => p.Id == id);
                var resultDto = _mapper.Map<TestResultDto>(result);
                return resultDto;
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
            DataTableData<TestResultDto> dataTableData = new DataTableData<TestResultDto>();
            try
            {
                var query = _dbContext.TestResults.Select(x => new TestResultDto
                {
                    Description = x.Description,
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
                if (totalCount > 0 && (!string.IsNullOrEmpty(dataItems.Search) || !string.IsNullOrWhiteSpace(dataItems.Search)))
                {
                    var value = dataItems.Search.Trim();
                    query = query.Where(p => p.Description.Contains(value));
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
        public async Task<int> AddTestResult(TestResultDto testResultData)
        { 
            try
            {
                var TestResult = _mapper.Map<TestResult>(testResultData);
                _dbContext.TestResults.Add(TestResult);
                await _dbContext.SaveChangesAsync();
                return TestResult.Id;
            }
            catch (Exception)
            {
               return -1;
            }
        }
        public async Task<IEnumerable<TestResultDto>> GetAll()
        {
            try
            {
                List<TestResultDto> list = await _dbContext.TestResults.Select(x => new TestResultDto
                {
                    Description = x.Description,
                    Id = x.Id
                }).ToListAsync();
                return list;
            }
            catch (Exception e)
            {

                return null;
            }
        }
        public async Task<bool> RemoveTestResult(int id)
        {
            try
            {
                var TestResult = _dbContext.TestResults.AsNoTracking().FirstOrDefault(p => p.Id == id);
                if (TestResult == null) 
                {
                    return false;
                }
                var TestResultToRemove= _mapper.Map<TestResult>(TestResult);
                _dbContext.Entry(TestResultToRemove).State = EntityState.Deleted;
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        public async Task<int> UpdateTestResult(TestResultDto testResultData)
        {
            try
            {
                var savedTestResult = _dbContext.TestResults.AsNoTracking().FirstOrDefault(p => p.Id == testResultData.Id);
                if (savedTestResult == null)
                {
                    return -1;
                }
                _dbContext.Entry(_mapper.Map<TestResult>(testResultData)).State=EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return savedTestResult.Id;
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}
