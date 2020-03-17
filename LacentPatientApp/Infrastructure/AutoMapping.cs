using AutoMapper;
using LancetApp.Common.DTOs;
using LancetApp.DAL.Entities;
using LancetApp.Web.Models;

namespace LancetApp.Web.Infrastructure
{
    public class AutoMapping:Profile
    {
        public AutoMapping()
        {
            CreateMap<PatientViewModel, PatientDto>();// means you want to map from User to UserDTO
            CreateMap<PatientDto, PatientViewModel>();
            CreateMap<AddressViewModel, AddressDto>();
            CreateMap<AddressDto, AddressViewModel>();
            CreateMap<CountryViewModel, CountryDto>();
            CreateMap<CountryDto,CountryViewModel>();
            CreateMap<DatatableParametersViewModel, DatatableParametersDto>();

            CreateMap<TestResultViewModel, TestResultDto>();// means you want to map from User to UserDTO
            CreateMap<TestResultDto, TestResultViewModel>();

            CreateMap<TestViewModel, TestDto>();// means you want to map from User to UserDTO
            CreateMap<TestDto, TestViewModel>();

            CreateMap<NormalRangeViewModel, NormalRangeDto>();// means you want to map from User to UserDTO
            CreateMap<NormalRangeDto, NormalRangeViewModel>();

            CreateMap<RequisitionViewModel, RequisitionDto>();// means you want to map from User to UserDTO
            CreateMap<RequisitionDto, RequisitionViewModel>(); 

            CreateMap<PatientProfileViewModel, PatientProfileDto>();// means you want to map from User to UserDTO
            CreateMap<PatientProfileDto, PatientProfileViewModel>();

            CreateMap<Patient, PatientDto>().ForMember(c => c.CreatedBy, option => option.Ignore());
            CreateMap<PatientDto, PatientDto>().ForMember(c => c.Id, option => option.Ignore()).ForMember(c => c.AddedById, option => option.Ignore()).ForMember(c => c.AddressId, option => option.Ignore());
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
