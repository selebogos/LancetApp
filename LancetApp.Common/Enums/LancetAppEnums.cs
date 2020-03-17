using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.Enums
{
    public class LancetAppEnums
    {
        public enum SystemRoles {
            Admin,
            Doctor
        }
        public enum TestResults { 
            Positive=1,
            Negative=2,
            Failed=3
        }
        public enum NormalRange
        {
            Normal = 1,
            Abnormal = 2,
            Neutral = 3
        }
    }
}
