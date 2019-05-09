using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WasherRev.Common.Attributes;
using WasherRev.Common.Enums;

namespace WasherRev.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : Controller
    {

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {

            List<object> roles = new List<object>();

            var roleNames = Enum.GetNames(typeof(ERole)).ToList();
            int i = 1;
            foreach (var role in roleNames)
            {
                roles.Add(new
                {
                    Id = i++,
                    Name = role
                });
            }

            return Ok(roles);

            //Dictionary<int, string> roles = new Dictionary<int, string>();
            //var roleNames = Enum.GetNames(typeof(ERole)).ToList();
            //int i = 1;
            //foreach (var role in roleNames)
            //{
            //    roles.Add(i++, role);
            //}

            //return Ok(roles);
        }

    }
}