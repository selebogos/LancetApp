using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.DTOs
{
    public class PatientProfileDto
    {
        public PatientProfileDto()
        {
            Requisitions = new List<RequisitionDto>();
        }
        public Guid Id { get; set; }
        public virtual ICollection<RequisitionDto> Requisitions { get; set; }
        public Guid PatientId { get; set; }
        public virtual PatientDto Patient { get; set; }
    }
}
