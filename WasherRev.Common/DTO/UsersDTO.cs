using System;
using System.Collections.Generic;
using System.Text;
using WasherRev.Common.Enums;

namespace WasherRev.Common.DTO
{
    public class UsersDTO
    {
        public int Id { get; set; }
        public ERole RoleNo { get; set; }
        public string RoleName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int BuildingId { get; set; }
        public BuildingDTO Building { get; set; }
        public string Token { get; set; }
        public bool IsActive { get; set; }
    }
}
