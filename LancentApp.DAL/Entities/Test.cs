using LancetApp.DAL.DBContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace LancetApp.DAL.Entities
{
    [Table("Tests")]
    public class Test : DomainEntity
    {
        public string Name { get; set; }
        public string Comment { get; set; }
        public int TestResultId { get; set; }
        [ForeignKey("TestResultId")]
        public virtual TestResult TestResult { get; set; }
        public int NormalValueId { get; set; }
        [ForeignKey("NormalValueId")]
        public virtual NormalRange NormalValue { get; set; }
        public Guid RequisitionId { get; set; }
        [ForeignKey("RequisitionId")]
        public virtual Requisition Requisition { get; set; }
    }
}
