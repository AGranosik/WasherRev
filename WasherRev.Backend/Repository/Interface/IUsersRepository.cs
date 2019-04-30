using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Repository.Interface
{
    public interface IUsersRepository : IBaseRepository<Users>
    {
        Task<Users> GetByUserNameAsync(string username);
    }
}
