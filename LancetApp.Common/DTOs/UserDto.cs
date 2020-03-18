using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string path { get; set; }
        public string Password { get; set; }
        public DateTime TokenExpiryTime { get; set; }
        public string Token { get; set; }
        public string UserRole { get; set; }
        public string Username { get; set; }
    }
}
