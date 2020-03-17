using LancetApp.DAL.Entities;
using System;
namespace LancetApp.Common.DTOs
{
    public class TestDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public int TestResultId { get; set; }
        public virtual TestResultDto TestResult { get; set; }
        public int NormalValueId { get; set; }
        public virtual NormalRangeDto NormalValue { get; set; }
        public Guid RequisitionId { get; set; }
        public virtual RequisitionDto Requisition { get; set; }
    }
}
