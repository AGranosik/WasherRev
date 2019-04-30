using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Backend.Services.Interfaces;
using WasherRev.Common.DTO;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Services
{
    public class BuildingService : BaseService<IBuildingRepository, Building>, IBuildingService
    {
        public BuildingService(
            IMapper mapper,
            IBuildingRepository repository) : base(mapper, repository)
        {
        }

        public async Task<List<BuildingDTO>> GetAllDTO()
        {
            var result = await _repository.GetAll();
            var dtoResult = new List<BuildingDTO>();

            result.ForEach(x => dtoResult.Add(_mapper.Map<Building, BuildingDTO>(x)));

            return dtoResult;
        }

        public async Task<BuildingDTO> GetDTOById(int id)
        {
            var model = await _repository.GetById(id);

            return _mapper.Map<Building, BuildingDTO>(model);
        }

        public async Task<BuildingDTO> Insert(BuildingDTO model)
        {
            var result = await _repository.Insert(_mapper.Map<BuildingDTO, Building>(model));
            if (result != null)
                return _mapper.Map<Building, BuildingDTO>(result);

            // throw exception
            return null;
        }

        public async Task<BuildingDTO> Update(BuildingDTO model)
        {
            var result = await _repository.Update(_mapper.Map<BuildingDTO, Building>(model));
            if (result != null)
                return _mapper.Map<Building, BuildingDTO>(result);

            return null;
        }
    }
}
