using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LancetApp.Web.Models
{
    public class DatatableParametersViewModel
    {
        public int Draw { get; set; }
        public int Start { get; set; }
        public int Length { get; set; }
        public string Search { get; set; }
    }
}
