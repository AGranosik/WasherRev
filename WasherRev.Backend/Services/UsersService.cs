using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Backend.Services.Interfaces;
using WasherRev.Common.DTO;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Services
{
    public class UsersService : BaseService<IUsersRepository, Users>, IUsersService
    {

        protected readonly IBuildingRepository _buildingRepository;
        public UsersService(
            IMapper mapper,
            IUsersRepository repository,
            IBuildingRepository buildingRepository) : base(mapper, repository)
        {
            _buildingRepository = buildingRepository;
        }

        public async Task<List<UsersDTO>> GetAllDTO()
        {
            var models = await _repository.GetAll();
            var dtos = new List<UsersDTO>();

            models.ForEach(async x => dtos.Add(await ConvertToDto(x)));

            return dtos;
        }

        public async Task<UsersDTO> GetDTOById(int id)
        {
            return await ConvertToDto(await _repository.GetById(id));
        }

        public async Task<UsersDTO> Insert(UsersDTO model)
        {
            var pureModel = ConvertToPureModel(model);
            var insertedModel = await _repository.Insert(pureModel);

            return await ConvertToDto(insertedModel);
        }

        public async Task<UsersDTO> Update(UsersDTO model)
        {
            var pureModel = ConvertToPureModel(model);
            var updatedModel = await _repository.Update(pureModel);

            return await ConvertToDto(updatedModel);
        }

        protected async Task<UsersDTO> ConvertToDto(Users model)
        {
            var dto = _mapper.Map<Users, UsersDTO>(model);

            dto.Building = _mapper.Map<Building, BuildingDTO>(await _buildingRepository.GetById(model.BuildingId));
            return dto;
        }

        protected Users ConvertToPureModel (UsersDTO dto)
        {
            var pureModel = _mapper.Map<UsersDTO, Users>(dto);
            pureModel.BuildingId = dto.Building.Id;

            return pureModel;
        }

        #region Authentication
        private string GenerateSaltedPassword(string password, string dbSalt = null)
        {

            byte[] salt;

            if (dbSalt == null)
                salt = GenerateSalt();
            else
                salt = Encoding.ASCII.GetBytes(dbSalt);

            var hashedPassword = HashPasswordWithSalt(Encoding.UTF8.GetBytes(password), salt);

            return Encoding.ASCII.GetString(hashedPassword, 0, hashedPassword.Length);
        }

        private byte[] GenerateSalt()
        {
            const int saltLength = 32;

            using (var randomNumberGenerator = new RNGCryptoServiceProvider())
            {
                var randomNumber = new byte[saltLength];
                randomNumberGenerator.GetBytes(randomNumber);

                return randomNumber;
            }
        }

        private byte[] Combine(byte[] first, byte[] second)
        {
            var ret = new byte[first.Length + second.Length];

            Buffer.BlockCopy(first, 0, ret, 0, first.Length);
            Buffer.BlockCopy(second, 0, ret, first.Length, second.Length);

            return ret;
        }

        private byte[] HashPasswordWithSalt(byte[] toBeHashed, byte[] salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var combinedHash = Combine(toBeHashed, salt);

                return sha256.ComputeHash(combinedHash);
            }
        }
        #endregion
    }
}
