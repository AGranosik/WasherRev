using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WasherRev.Api.Controllers;
using WasherRev.Backend.Services.Interfaces;
using WasherRev.Common.Attributes;
using WasherRev.Common.DTO;
using WasherRev.Common.Enums;
using WasherRev.Common.Model;
using WasherRev.test;

namespace WasherRev.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : BaseActionDtoController<IUsersService, UsersDTO>
    {
        public UsersController(IUsersService service) : base(service)
        {
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Authenticate([FromBody]User userParam)
        {
            var user = _service.Autheticate(userParam.Username, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [AuthorizeRoles(ERole.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return await RunGetActionListAsync(() => _service.GetAllDTO());
        }

        [AuthorizeRoles(ERole.Admin)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return await RunGetActionAsync(() => _service.GetDTOById(id));
        }

        [AuthorizeRoles(ERole.Admin)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UsersDTO user)
        {
            return await RunInsertActionAsync(() => _service.Insert(user));
        }


        [AuthorizeRoles(ERole.Admin)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UsersDTO user)
        {
            return await RunInsertActionAsync(() => _service.Update(user));
        }


        [AuthorizeRoles(ERole.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await RunDeleteActionAsync(() => _service.Remove(id));
        }
    }
}