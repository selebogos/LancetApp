using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LancetApp.Common.Config;
using LancetApp.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace LancetApp.Web.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;
        private readonly string _userId;
        private readonly IHttpContextAccessor _httpContextAccessor = null;

        public AccountController(IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> _userManager,
            SignInManager<IdentityUser> _signInManager, IOptions<AppSettings> appSettings)
        {
            this._userManager = _userManager;
            this._signInManager = _signInManager;
            _appSettings = appSettings.Value;
            _httpContextAccessor = httpContextAccessor;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel formdata)
        {
            try
            {
                List<string> errorList = new List<string>();
                var user = await _userManager.FindByEmailAsync(formdata.Email);
                if (user == null)
                {
                    errorList.Add("username does not exist");
                    return Ok(new JsonResult(new { message = "username does not exist" }));
                }
                var roles = await _userManager.GetRolesAsync(user);
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
                double tokenExpiryTime = Convert.ToDouble(_appSettings.ExpireTime);
                if (user != null && await _userManager.CheckPasswordAsync(user, formdata.Password))
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var tokenDesctiptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim(JwtRegisteredClaimNames.Sub,formdata.Email),
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
                    return Ok(new { token = tokenHandler.WriteToken(token), tokenExpiryTime = token.ValidTo, username = user.Email, userRole = roles.FirstOrDefault() });
                }
                return BadRequest(new JsonResult(new { message = "Please check your login credentials-Invalid username/Password was entered" }));
            }
            catch (Exception e)
            {

                return BadRequest(new JsonResult(new { message= "Please check your login credentials-Invalid username/Password was entered"}));
            }
            
        }
    }
}