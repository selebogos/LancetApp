using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.DTOs
{
    public class PatientProfileDataDto
    {
        public Guid profileId { get; set; }
        public string FullName { get; set; }
        public Guid patientId { get; set; }
    }
}
