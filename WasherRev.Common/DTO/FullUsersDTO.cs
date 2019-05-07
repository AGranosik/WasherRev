using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.DTO
{
    public class FullUsersDTO : UsersDTO
    {
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
