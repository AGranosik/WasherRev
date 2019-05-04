using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Text;
using WasherRev.Common.Enums;
using System.Linq;
using WasherRev.Common.Extensions;

namespace WasherRev.Common.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class AuthorizeRolesAttribute : AuthorizeAttribute
    {
        public AuthorizeRolesAttribute(params ERole[] roles)
        {
            this.Roles = string.Join(",", roles.Select(r => r));
        }
    }
}
