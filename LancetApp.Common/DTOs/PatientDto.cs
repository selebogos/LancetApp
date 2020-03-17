using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.DTOs
{
    public class PatientDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string AddedById { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<Guid> AddressId { get; set; }
        public string Address { get; set; }
    }
}
