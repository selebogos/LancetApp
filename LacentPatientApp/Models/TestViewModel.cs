using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LancetApp.Web.Models
{
    public class TestViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public int TestResultId { get; set; }
        public virtual TestResultViewModel TestResult { get; set; }
        public int NormalValueId { get; set; }
        public virtual NormalRangeViewModel NormalValue { get; set; }
        public Guid RequisitionId { get; set; }
        public virtual RequisitionViewModel Requisition { get; set; }
    }
}
