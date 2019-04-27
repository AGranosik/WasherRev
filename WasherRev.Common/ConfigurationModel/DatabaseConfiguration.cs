using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.ConfigurationModel
{
    public class DatabaseConfiguration
    {
        public string DataSource { get; set; }
        public string UserID { get; set; }
        public string Password { get; set; }
        public string InitialCatalog { get; set; }
    }
}
