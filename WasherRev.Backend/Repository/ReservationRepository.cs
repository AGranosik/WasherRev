using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Repository
{
    public class ReservationRepository : BaseRepository<Reservation>, IReservationRepository
    {
        public ReservationRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<List<Reservation>> GetReservationsForUser(DateTime date, int buildingId)
        {
            using(var conn = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Date", date);
                parameters.Add("@BuildingId", buildingId);

                var result = await conn.QueryAsync<Reservation>("Reservation_GetForUser",
                    param: parameters,
                commandType: System.Data.CommandType.StoredProcedure);

                return result.AsList<Reservation>();
            }
        }

        public async Task<List<Reservation>> GetUsersReervations(DateTime? date, int usersId)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Date", date);
                parameters.Add("@UsersId", usersId);

                var result = await conn.QueryAsync<Reservation>("Reservation_UsersReservations",
                    param: parameters,
                commandType: System.Data.CommandType.StoredProcedure);

                return result.AsList<Reservation>();
            }
        }
    }
}
