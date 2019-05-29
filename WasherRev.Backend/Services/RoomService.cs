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
    public class RoomService : BaseService<IRoomRepository, Room>, IRoomService
    {

        protected readonly IBuildingRepository _buildingRepository;
        public RoomService(
            IMapper mapper,
            IRoomRepository repository,
            IBuildingRepository buildingRepository) : base(mapper, repository)
        {
            _buildingRepository = buildingRepository;
        }

        public async Task<List<RoomDTO>> GetAllDTO()
        {
            var models = await _repository.GetAll();
            var dtos = new List<RoomDTO>();

            foreach(var model in models)
            {
                var dto = await ConvertToDto(model);
                dtos.Add(dto);
            }

            return dtos;
        }

        public async Task<RoomDTO> GetDTOById(int id)
        {
            return await ConvertToDto(await _repository.GetById(id));
        }

        public async Task<RoomDTO> Insert(RoomDTO model)
        {
            var pureModel = ConvertToPureModel(model);
            var insertedModel = await _repository.Insert(pureModel);
            return await ConvertToDto(insertedModel);
        }

        public async Task<RoomDTO> Update(RoomDTO model)
        {
            var pureModel = ConvertToPureModel(model);
            var updateModel = await _repository.Update(pureModel);
            return await ConvertToDto(updateModel);
        }

        protected async Task<RoomDTO> ConvertToDto(Room model)
        {
            var dto = _mapper.Map<Room, RoomDTO>(model);
            var buildingDto = await _buildingRepository.GetById(model.BuildingId);
            dto.Building = _mapper.Map<Building, BuildingDTO>(buildingDto);
            return dto;
        }

        protected Room ConvertToPureModel(RoomDTO dto)
        {
            var pureModel = _mapper.Map<RoomDTO, Room>(dto);

            return pureModel;
        }
    }
}
