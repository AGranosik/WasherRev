using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WasherRev.Backend.Services.Interfaces
{
    public interface IBaseDtoService<TDO>
    {
        Task<List<TDO>> GetAllDTO();
        Task<TDO> GetDTOById(int id);
        Task<TDO> Update(TDO model);
        Task<TDO> Insert(TDO model);
        Task Remove(int id);
    }
}
