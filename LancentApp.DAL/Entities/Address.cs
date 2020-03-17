using LancetApp.DAL.DBContext;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace LancetApp.DAL.Entities
{
    [Table("Addresses")]
    public class Address:DomainEntity
    {
        public string Street { get; set; }
        public string Town { get; set; }
        public string Province { get; set; }
        public int Code { get; set; }
        public Guid CountryId { get; set; }
        [ForeignKey("CountryId")]
        public virtual Country Country{ get; set; }
    }
}
