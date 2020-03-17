using LancetApp.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LancetApp.Core.Abstraction
{
    public interface IPatientProfileService
    {
        Task<Guid> AddPatientProfile(PatientProfileDto patientData);
        Task<IEnumerable<PatientProfileDto>> GetAll();
        Task<string> GetAll(DatatableParametersDto dataItems);
        Task<PatientProfileDto> Get(Guid id);
        Task<bool> RemovePatientProfile(Guid id);
        Task<Guid> UpdatePatientProfile(PatientProfileDto patientData);
        Task<bool> PatientHasBusinessProfile(Guid patientId);
    }
}
