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
    public class UsersRepository : BaseRepository<Users>, IUsersRepository
    {
        public UsersRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public async Task<Users> GetByUserNameAsync(string username)
        {
            using(var conn = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Username", username);

                var result = await conn.QuerySingleAsync<Users>("Users_GetByUsername",
                    param: parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return result;
            }
        }
    }
}
