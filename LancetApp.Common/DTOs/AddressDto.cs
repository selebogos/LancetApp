using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.DTOs
{
    public class AddressDto
    {
        public Guid Id { get; set; }
        public string Street { get; set; }
        public string Town { get; set; }
        public string Province { get; set; }
        public int Code { get; set; }
        public Guid CountryId { get; set; }
        public virtual CountryDto Country { get; set; }
    }
}
