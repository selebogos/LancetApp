using LancetApp.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LancetApp.Core.Abstraction
{
    public interface ITestResultService
    {
        Task<int> AddTestResult(TestResultDto testResultData);
        Task<IEnumerable<TestResultDto>> GetAll();
        Task<string> GetAll(DatatableParametersDto dataItems);
        Task<TestResultDto> Get(int id);
        Task<bool> RemoveTestResult(int id);
        Task<int> UpdateTestResult(TestResultDto TestResultData);
    }
}
