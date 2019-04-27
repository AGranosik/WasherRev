using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using WasherRev.Backend.Repository.Interface;

namespace WasherRev.Backend.Repository
{
    public class BaseRepository<TModel> : IBaseRepository<TModel>
    {
        private string connectionString;

        public BaseRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }


        public async Task<List<TModel>> GetAll()
        {
            using (var conn = new SqlConnection(connectionString))
            {
                var result = await conn.QueryAsync<TModel>($"{typeof(TModel).Name}_GetAll",
                    commandType: System.Data.CommandType.StoredProcedure);

                return result.AsList<TModel>();
            }
        }

        public async Task<TModel> GetById(int id)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", id);

                var result = await conn.QuerySingleAsync<TModel>(
                    $"{typeof(TModel).Name}_GetAll",
                    param: parameters,
                    commandType: System.Data.CommandType.StoredProcedure
                    );

                return result;
            }
        }

        public async Task<TModel> Insert(TModel model)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = GetDynamicParameters(model);
                var result = await conn.QuerySingleAsync<int>($"{typeof(TModel).Name}_Insert",
                    param: parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return await GetById(result);
            }
        }

        public async Task Remove(int id)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", id);
                var result = await conn.QuerySingleAsync<TModel>($"{typeof(TModel).Name}_Remove",
                    param: parameters,
                    commandType: System.Data.CommandType.StoredProcedure);
            }
        }

        public async Task<TModel> Update(TModel model)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = GetDynamicParameters(model, true);
                var result = await conn.QuerySingleAsync<int>($"{typeof(TModel).Name}_Update",
                    param: parameters,
                    commandType: System.Data.CommandType.StoredProcedure);

                return await GetById(result);
            }
        }

        private DynamicParameters GetDynamicParameters(TModel model, bool withId = false)
        {
            var properties = typeof(TModel).GetProperties();
            DynamicParameters parameters = new DynamicParameters();
            foreach(var property in properties)
            {
                if(property.Name.Equals("Id") && withId)
                {
                    parameters.Add($"@{property.Name}");
                }
                else if(!property.Name.Equals("Id") && !withId)
                {
                    parameters.Add($"@{property.Name}");
                }
            }

            return parameters;
        }
    }
}
