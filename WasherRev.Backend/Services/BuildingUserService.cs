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
    public class BuildingUserService : BaseService<IBuildingUserRepository, BuildingUser>, IBuildingUserService
    {
        protected readonly IBuildingRepository _buildingRepository;
        protected readonly IUsersRepository _usersRepository;

        public BuildingUserService(
            IMapper mapper,
            IBuildingUserRepository repository,
            IBuildingRepository buildingRepository,
            IUsersRepository usersRepository) : base(mapper, repository)
        {
            _buildingRepository = buildingRepository;
            _usersRepository = usersRepository;
        }

        public async Task<List<BuildingUserDTO>> GetAllDTO()
        {
            var models = await _repository.GetAll();
            var result = new List<BuildingUserDTO>();

            models.ForEach(async x => result.Add(await ConvertToDTO(x)));

            return result;
        }

        public async Task<BuildingUserDTO> GetDTOById(int id)
        {
            var model = await _repository.GetById(id);
            if (model != null)
                return await ConvertToDTO(model);

            return null;
        }

        public async Task<BuildingUserDTO> Insert(BuildingUserDTO model)
        {
            var pureModel = _mapper.Map<BuildingUserDTO, BuildingUser>(model);
            pureModel.UsersId = model.Users.Id;
            pureModel.BuildingId = model.Building.Id;

            var result = _mapper.Map<BuildingUser, BuildingUserDTO>(await _repository.Insert(pureModel));
            return result;
        }

        public async Task<BuildingUserDTO> Update(BuildingUserDTO model)
        {
            return _mapper.Map<BuildingUser, BuildingUserDTO>(await _repository.Update(GetPureModel(model)));
        }

        protected async Task<BuildingUserDTO> ConvertToDTO(BuildingUser model)
        {
            var dto = _mapper.Map<BuildingUser, BuildingUserDTO>(model);

            dto.Building = _mapper.Map<Building, BuildingDTO>(await _buildingRepository.GetById(model.BuildingId));
            dto.Users = _mapper.Map<Users, UsersDTO>(await _usersRepository.GetById(model.UsersId));

            return dto;
        }

        protected BuildingUser GetPureModel(BuildingUserDTO dto)
        {
            var pureModel = _mapper.Map<BuildingUserDTO, BuildingUser>(dto);
            pureModel.UsersId = dto.Users.Id;
            pureModel.BuildingId = dto.Building.Id;

            return pureModel;
        }
    }
}
