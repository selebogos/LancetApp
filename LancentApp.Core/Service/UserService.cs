using AutoMapper;
using LancetApp.Common.Config;
using LancetApp.Common.DTOs;
using LancetApp.Core.Abstraction;
using LancetApp.DAL.DBContext;
using LancetApp.DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LancetApp.Core.Service
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly string _userId;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;

        public UserService(IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, IOptions<AppSettings> appSettings, 
            ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
        public async Task<UserDto> GetUserProfile()
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(_userId);
                var result = new UserDto {Email=user.Email,Id=user.Id };
                return result;
            }
            catch (Exception e)
            {

                return null;
            }
        }

        public async Task<UserDto> Login(UserDto userData)
        {
            try
            {
                List<string> errorList = new List<string>();
                var user = await _userManager.FindByEmailAsync(userData.Email);
                if (user == null)
                {
                    return null;
                }
                var roles = await _userManager.GetRolesAsync(user);
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
                double tokenExpiryTime = Convert.ToDouble(_appSettings.ExpireTime);
                if (user != null && await _userManager.CheckPasswordAsync(user, userData.Password))
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var tokenDesctiptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim(JwtRegisteredClaimNames.Sub,userData.Email),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.NameIdentifier,user.Id),
                        new Claim(ClaimTypes.Role,roles.FirstOrDefault()),
                        new Claim("LoggedOn",DateTime.Now.ToString()),
                        }),

                        SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                        Issuer = _appSettings.Site,
                        Audience = _appSettings.Audience,
                        Expires = DateTime.UtcNow.AddMinutes(tokenExpiryTime)
                    };
                    //Generate Token
                    var token = tokenHandler.CreateToken(tokenDesctiptor);
                    return null;
                }
                return null;
            }
            catch (Exception e)
            {

                return null;
            }
        }

        public async Task<bool> UploadProfilePicture(string path)
        {
            try
            {
                var userInfo = await _userManager.FindByEmailAsync(_userId);
                var profile=await _dbContext.ProfilePicture.FirstOrDefaultAsync(p => p.UserId == userInfo.Id) ?? new ProfilePicture { UserId=userInfo.Id};
                profile.path = path;
                if (profile.Id == Guid.Empty)
                {
                    _dbContext.Add(profile);
                }
                else
                {
                    _dbContext.Entry(profile).State = EntityState.Modified;
                    
                }
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {

                return false;
            }
        }
    }
}
