using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WasherRev.Backend.Services.Interfaces;
using WasherRev.Common.Attributes;
using WasherRev.Common.DTO;
using WasherRev.Common.Enums;

namespace WasherRev.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class WasherController : BaseActionDtoController<IWasherService, WasherDTO>
    {
        public WasherController(IWasherService service) : base(service)
        {
        }

        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return await RunGetActionListAsync(() => _service.GetAllDTO());
        }

        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return await RunGetActionAsync(() => _service.GetDTOById(id));
        }

        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WasherDTO washer)
        {
            return await RunInsertActionAsync(() => _service.Insert(washer));
        }


        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] WasherDTO washer)
        {
            return await RunInsertActionAsync(() => _service.Update(washer));
        }


        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await RunDeleteActionAsync(() => _service.Remove(id));
        }
    }
}