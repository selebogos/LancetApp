using LancetApp.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LancetApp.Core.Abstraction
{
    public interface IPatientService
    {
        Task<Tuple<Guid, string>> AddPatient(PatientDto patientData);
        Task<IEnumerable<PatientDto>> GetAll();
        Task<string> GetAll(DatatableParametersDto dataItems);
        Task<PatientDto> Get(Guid id);
        Task<List<PatientProfileDataDto>> SearchByName(string name);
        Task<bool> RemovePatient(Guid id);
        Task<Guid> UpdatePatient(PatientDto patientData);
    }
}
