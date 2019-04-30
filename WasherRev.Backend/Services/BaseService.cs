using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Backend.Services.Interfaces;

namespace WasherRev.Backend.Services
{
    public class BaseService<TRepository, TModel> : IBaseService<TModel>
        where TModel : class
        where TRepository : IBaseRepository<TModel>
    {
        protected readonly TRepository _repository;
        protected readonly IMapper _mapper;

        public BaseService(
            IMapper mapper,
            TRepository repository)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<List<TModel>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<TModel> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<TModel> Insert(TModel model)
        {
            return await _repository.Insert(model);
        }

        public async Task Remove(int id)
        {
            await _repository.Remove(id);
        }

        public async Task<TModel> Update(TModel model)
        {
            return await _repository.Update(model);
        }
    }
}
