using LancetApp.DAL.DBContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace LancetApp.DAL.Entities
{
    [Table("TestResults")]
    public class TestResult 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
