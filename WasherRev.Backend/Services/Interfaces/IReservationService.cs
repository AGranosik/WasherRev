using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WasherRev.Common.DTO;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Services.Interfaces
{
    public interface IReservationService : IBaseDtoService<ReservationDTO>
    {
        Task<List<ReservationDTO>> GetReservationsForUser(DateTime date, int buildingId);
        Task<List<ReservationDTO>> GetUsersReervations(DateTime? date, int usersId);
    }
}
