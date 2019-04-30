using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Backend.Services.Interfaces;
using WasherRev.Common.DTO;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Services
{
    public class ProducerService : BaseService<IProducerRepository, Producer>, IProducerService
    {
        public ProducerService(IMapper mapper, IProducerRepository repository) : base(mapper, repository)
        {
        }

        public async Task<List<ProducerDTO>> GetAllDTO()
        {
            var models = await _repository.GetAll();
            var dtos = new List<ProducerDTO>();

            models.ForEach(x => dtos.Add(_mapper.Map<Producer, ProducerDTO>(x)));
            return dtos;
        }

        public async Task<ProducerDTO> GetDTOById(int id)
        {
            return _mapper.Map<Producer, ProducerDTO>(await _repository.GetById(id));
        }

        public async Task<ProducerDTO> Insert(ProducerDTO model)
        {
            var pureModel = _mapper.Map<ProducerDTO, Producer>(model);
            return _mapper.Map<Producer, ProducerDTO>(await _repository.Insert(pureModel));
        }

        public async Task<ProducerDTO> Update(ProducerDTO model)
        {
            var pureModel = _mapper.Map<ProducerDTO, Producer>(model);
            return _mapper.Map<Producer, ProducerDTO>(await _repository.Update(pureModel));
        }
    }
}
