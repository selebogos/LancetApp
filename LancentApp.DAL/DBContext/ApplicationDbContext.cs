using LancetApp.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace LancetApp.DAL.DBContext
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>().HasData(
                 new { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
                 new { Id = "2", Name = "Doctor", NormalizedName = "DOCTOR" }
                );
            builder.Entity<Country>().HasData(
                 new { Id=Guid.NewGuid(), Name = "South Africa", Code = "ZA" }
                );
            builder.Entity<TestResult>().HasData(
                 new { Id = 1, Description = "Positive" },
                 new { Id = 2, Description = "Negative" },
                 new { Id = 3, Description = "Failed" }
                );
            builder.Entity<NormalRange>().HasData(
                 new { Id = 1, Description = "Normal"},
                 new { Id = 2, Description = "Abnormal" },
                 new { Id = 3, Description = "Neutral" }
                );
        }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<PatientProfile> PatientProfiles { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<Requisition> Requisitions { get; set; }
        public DbSet<NormalRange> NormalRanges { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}
