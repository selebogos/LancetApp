using LancetApp.DAL.DBContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace LancetApp.DAL.Entities
{
    [Table("Institutions")]
    public class Institution : DomainEntity
    {
        public string Name { get; set; }
        public Nullable<Guid> AddressId { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
        [ForeignKey("AddressId")]
        public virtual Address Address { get; set; }
    }
}
