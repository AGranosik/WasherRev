using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.Model
{
    public class Users
    {
        public int Id { get; set; }
        public int RoleNo { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int BuildingId { get; set; }
        public bool IsActive { get; set; }
        public string Salt { get; set; }
    }
}
