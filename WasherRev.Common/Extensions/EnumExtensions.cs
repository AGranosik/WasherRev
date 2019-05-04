using System;
using System.Collections.Generic;
using System.Text;
using WasherRev.Common.Enums;

namespace WasherRev.Common.Extensions
{
    public static class EnumExtensions
    {
        public static string RoleNoToRoleName(this ERole roleNo)
        {
            return roleNo.ToString();
        }

        public static int RoleNameToRoleNo(this string roleName)
        {
            Enum.TryParse(roleName, out ERole role);
            return (int)role;
        }
    }
}
