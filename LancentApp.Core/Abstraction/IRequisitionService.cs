using LancetApp.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LancetApp.Core.Abstraction
{
    public interface IRequisitionService
    {
        Task<Guid> AddRequisition(RequisitionDto patientData);
        Task<IEnumerable<RequisitionDto>> GetAll();
        Task<string> GetAll(DatatableParametersDto dataItems);
        Task<RequisitionDto> Get(Guid id);
        Task<bool> RemoveRequisition(Guid id);
        Task<Guid> UpdateRequisition(RequisitionDto patientData);
    }
}
