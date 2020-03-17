using LancetApp.DAL.DBContext;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LancetApp.DAL.Entities
{
    [Table("Requisitions")]
    public class Requisition : DomainEntity
    {
        public Requisition()
        {
            Tests = new List<Test>();
        }
        public DateTime DateSubmitted { get; set; }
        [Required]
        public string ReferringPhysician { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
        public Guid ProfileId { get; set; }
        [ForeignKey("ProfileId")]
        public virtual PatientProfile Profile { get; set; }
    }
}
