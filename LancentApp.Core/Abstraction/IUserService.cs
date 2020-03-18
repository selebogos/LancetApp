using LancetApp.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LancetApp.Core.Abstraction
{
    public interface IUserService
    {
        Task<UserDto> GetUserProfile();
        Task<bool> UploadProfilePicture(string path);
        Task<UserDto> Login(UserDto userData);
    }
}
