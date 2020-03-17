using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LancetApp.Web.Models
{
    public class PatientProfileViewModel
    {
        public PatientProfileViewModel()
        {
            Requisitions = new List<RequisitionViewModel>();
        }
        public Guid Id { get; set; }
        public virtual ICollection<RequisitionViewModel> Requisitions { get; set; }
        public Guid PatientId { get; set; }
        public virtual PatientViewModel Patient { get; set; }
    }
}
