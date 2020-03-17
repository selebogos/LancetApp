using AutoMapper;
using LancetApp.Common.DTOs;
using LancetApp.DAL.Entities;

namespace LancetApp.Common.Infrastructure
{
    public class CommonAutoMapping:Profile
    {
        public CommonAutoMapping()
        {
            CreateMap<Patient, PatientDto>().ForMember(c => c.CreatedBy, option => option.Ignore());
            // means you want to map from User to UserDTO
            CreateMap<PatientDto, Patient>().ForMember(c => c.User, option => option.Ignore());
            CreateMap<Address, AddressDto>();
            CreateMap<AddressDto, Address>();
            CreateMap<Country, CountryDto>();
            CreateMap<CountryDto, Country>();

            CreateMap<TestResult, TestResultDto>();
            CreateMap<TestResultDto, TestResult>();

            CreateMap<NormalRange, NormalRangeDto>();
            CreateMap<NormalRangeDto, NormalRange>();

            CreateMap<Test, TestDto>();
            CreateMap<TestDto, Test>();

            CreateMap<Requisition, RequisitionDto>();
            CreateMap<RequisitionDto, Requisition>();

            CreateMap<PatientProfile, PatientProfileDto>();
            CreateMap<PatientProfileDto, PatientProfile>();
        }
    }
}
