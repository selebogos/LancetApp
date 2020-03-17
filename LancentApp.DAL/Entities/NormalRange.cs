using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LancetApp.DAL.Entities
{
    [Table("NormalRanges")]
    public class NormalRange 
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
