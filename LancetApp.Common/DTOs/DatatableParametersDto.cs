using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.DTOs
{
    public class DatatableParametersDto
    {
        public int Draw { get; set; }
        public int Start { get; set; }
        public int Length { get; set; }
        public string Search { get; set; }
    }
}
