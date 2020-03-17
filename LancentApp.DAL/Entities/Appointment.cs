using LancetApp.DAL.DBContext;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace LancetApp.DAL.Entities
{
    [Table("Appointments")]
    public class Appointment : DomainEntity
    {
        public string Time { get; set; }
        public DateTime Date { get; set; }
        public string AppointmentBy { get; set; }
        public string Email { get; set; }
        public Guid InstitutionId { get; set; }
        [ForeignKey("InstitutionId")]
        public virtual Institution Institution { get; set; }
    }
}
