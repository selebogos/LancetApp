using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LancetApp.Web.Models
{
    public class TestViewModel
    {
        public Guid Id { get; set; }
        [Required(ErrorMessage = "The test name is required")]
        public string Name { get; set; }
        public string Comment { get; set; }
        [Required(ErrorMessage = "The test result is required")]
        public int TestResultId { get; set; }
        public virtual TestResultViewModel TestResult { get; set; }
        [Required(ErrorMessage = "The normal range value is required")]
        public int NormalValueId { get; set; }
        public virtual NormalRangeViewModel NormalValue { get; set; }
        [Required(ErrorMessage = "The requisition number is required")]
        public Guid RequisitionId { get; set; }
        public virtual RequisitionViewModel Requisition { get; set; }
    }
}
