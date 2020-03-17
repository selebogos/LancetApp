using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LancetApp.Web.Models
{
    public class PatientViewModel
    {
        public Guid Id { get; set; }
        [Required(ErrorMessage = "The patient's name is required")]
        public string FullName { get; set; }
        public string AddedById { get; set; }
        public string CreatedBy { get; set; }
        public string Address { get; set; }
    }
}
