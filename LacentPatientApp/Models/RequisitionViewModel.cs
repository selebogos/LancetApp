using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LancetApp.Web.Models
{
    public class RequisitionViewModel
    {
        public RequisitionViewModel()
        {
            Tests = new List<TestViewModel>();
        }
        public Guid Id { get; set; }
        public int RequisitionNumber { get; set; }
        [Required(ErrorMessage = "The date submitted is required")]
        public DateTime DateSubmitted { get; set; }
        [Required(ErrorMessage = "The referring physician is required")]
        public string ReferringPhysician { get; set; }
        public virtual ICollection<TestViewModel> Tests { get; set; }
        [Required(ErrorMessage = "The patient is required")]
        public Guid ProfileId { get; set; }
        public virtual PatientProfileViewModel Profile { get; set; }
    }
}
