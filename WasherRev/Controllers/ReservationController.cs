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
    public class ReservationController : BaseActionDtoController<IReservationService, ReservationDTO>
    {
        public ReservationController(IReservationService service) : base(service)
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
        public async Task<IActionResult> Post([FromBody] ReservationDTO reservation)
        {
            return await RunInsertActionAsync(() => _service.Insert(reservation));
        }


        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ReservationDTO reservation)
        {
            return await RunInsertActionAsync(() => _service.Update(reservation));
        }


        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await RunDeleteActionAsync(() => _service.Remove(id));
        }

        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpGet("[action]/{buildingId}/{year}/{month}")]
        public async Task<IActionResult> GetReservationsForUser(int buildingId, int year, int month)
        {
            return await RunGetActionListAsync(() => _service.GetReservationsForUser(new DateTime(year, month, DateTime.Now.Day), buildingId));
        }

        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpGet("[action]/{usersId}/{year}/{month}")]
        public async Task<IActionResult> GetUsersReservations(int usersId, int year, int month)
        {

            return await RunGetActionListAsync(() => _service.GetUsersReervations(new DateTime(year,month, 1), usersId));
        }

        [AuthorizeRoles(ERole.Admin, ERole.User)]
        [HttpPut("{reservationId}/User/{userId}")]
        public async Task<IActionResult> MakeReservationByUser(int reservationId, int userId)
        {
            return await RunGetActionAsync(() => _service.MakeReservation(reservationId, userId));
        }
    }
}