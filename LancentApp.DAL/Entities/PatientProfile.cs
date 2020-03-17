using LancetApp.DAL.DBContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace LancetApp.DAL.Entities
{
    [Table("PatientProfiles")]
    public class PatientProfile : DomainEntity
    {
        public PatientProfile()
        {
            Requisitions = new List<Requisition>();
        }
        public virtual ICollection<Requisition> Requisitions { get; set; }
        public Guid PatientId { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
    }
}
