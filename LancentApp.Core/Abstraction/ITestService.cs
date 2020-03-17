using LancetApp.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LancetApp.Core.Abstraction
{
    public interface ITestService
    {
        Task<Guid> AddTest(TestDto patientData);
        Task<IEnumerable<TestDto>> GetAll();
        Task<string> GetAll(DatatableParametersDto dataItems);
        Task<TestDto> Get(Guid id);
        Task<bool> RemoveTest(Guid id);
        Task<Guid> UpdateTest(TestDto patientData);
    }
}
