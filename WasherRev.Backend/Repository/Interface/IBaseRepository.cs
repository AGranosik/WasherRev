using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WasherRev.Backend.Repository.Interface
{
    public interface IBaseRepository<TModel>
    {
        Task<List<TModel>> GetAll();
        Task<TModel> GetById(int id);
        Task<TModel> Update(TModel model);
        Task<TModel> Insert(TModel model);
        Task Remove(int id);
    }
}
