using System;
using System.Collections.Generic;
using System.Text;

namespace LancetApp.Common.Config
{
    public class AppSettings
    {
        public string Site { get; set; }
        public string Audience { get; set; }
        public string ExpireTime { get; set; }
        public string Secret { get; set; }
    }
}
