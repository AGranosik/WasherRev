using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WasherRev.Backend.Services.Interfaces
{
    public interface IBaseService<TModel>
    {
        Task<List<TModel>> GetAll();
        Task<TModel> GetById(int id);
        Task<TModel> Update(TModel model);
        Task<TModel> Insert(TModel model);
        Task Remove(int id);
    }
}
