using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.DTOs
{
    public class RequisitionTestDataDto
    {
        public Guid RequisitionId { get; set; }
        public int RequisitionNumber { get; set; }
        public Guid patientId { get; set; }
    }
}
