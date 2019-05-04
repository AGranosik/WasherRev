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
    public class ProducerController : BaseActionDtoController<IProducerService, ProducerDTO>
    {
        public ProducerController(IProducerService service) : base(service)
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
        public async Task<IActionResult> Post([FromBody] ProducerDTO producer)
        {
            return await RunInsertActionAsync(() => _service.Insert(producer));
        }


        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ProducerDTO producer)
        {
            return await RunInsertActionAsync(() => _service.Update(producer));
        }


        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await RunDeleteActionAsync(() => _service.Remove(id));
        }
    }
}