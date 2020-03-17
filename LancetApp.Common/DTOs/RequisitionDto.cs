using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LancetApp.Common.DTOs
{
    public class RequisitionDto
    {
        
        public RequisitionDto()
        {
            Tests = new List<TestDto>();
        }
        public Guid Id { get; set; }
        public DateTime DateSubmitted { get; set; }
        [Required]
        public string ReferringPhysician { get; set; }
        public virtual ICollection<TestDto> Tests { get; set; }
        public Guid ProfileId { get; set; }
        public virtual PatientProfileDto Profile { get; set; }
    }
}
