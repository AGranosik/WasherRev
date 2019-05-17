using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Repository.Interface
{
    public interface IReservationRepository : IBaseRepository<Reservation>
    {
        Task<List<Reservation>> GetReservationsForUser(DateTime date, int buildingId);
        Task<List<Reservation>> GetUsersReervations(DateTime? date, int usersId);
        Task<Reservation> MakeReservation(int reservationId, int userId);
    }
}
