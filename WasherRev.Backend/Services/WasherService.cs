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
    public class WasherService : BaseService<IWasherRepository, Washer>, IWasherService
    {

        protected readonly IRoomRepository _roomRepository;
        protected readonly IProducerRepository _producerRepository;
        public WasherService(
            IMapper mapper,
            IWasherRepository repository,
            IRoomRepository roomRepository,
            IProducerRepository producerRepository) : base(mapper, repository)
        {
            _roomRepository = roomRepository;
            _producerRepository = producerRepository;
        }

        public async Task<List<WasherDTO>> GetAllDTO()
        {
            var models = await _repository.GetAll();
            var dtos = new List<WasherDTO>();

            models.ForEach(async x => dtos.Add(await ConvertToDTO(x)));
            return dtos;
        }

        public async Task<WasherDTO> GetDTOById(int id)
        {
            return await ConvertToDTO(await _repository.GetById(id));
        }

        public async Task<WasherDTO> Insert(WasherDTO model)
        {
            var pureModel = ConvertToPureModel(model);
            var insertedModel = await _repository.Insert(pureModel);
            return await ConvertToDTO(insertedModel);
        }

        public async Task<WasherDTO> Update(WasherDTO model)
        {
            var pureModel = ConvertToPureModel(model);
            var updatedModel = await _repository.Update(pureModel);
            return await ConvertToDTO(updatedModel);
        }

        public async Task<WasherDTO> ConvertToDTO(Washer model)
        {
            var dto = _mapper.Map<Washer, WasherDTO>(model);
            dto.Producer = _mapper.Map<Producer, ProducerDTO>(await _producerRepository.GetById(model.ProducerId));
            dto.Room = _mapper.Map<Room, RoomDTO>(await _roomRepository.GetById(model.RoomId));

            return dto;
        }

        public Washer ConvertToPureModel(WasherDTO dto)
        {
            var pureModel = _mapper.Map<WasherDTO, Washer>(dto);

            return pureModel;
        }
    }
}
