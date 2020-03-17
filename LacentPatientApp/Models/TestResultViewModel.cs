using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LancetApp.Web.Models
{
    public class TestResultViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "The test result description is required")]
        public string Description { get; set; }
    }
}
