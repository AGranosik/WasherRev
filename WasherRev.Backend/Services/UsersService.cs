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
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WasherRev.Common.Enums;
using WasherRev.Common.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace WasherRev.Backend.Services
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UsersService : BaseService<IUsersRepository, Users>, IUsersService
    {

        private List<Users> mockList = new List<Users>
        {
            new Users
            {
                Id = 1,
                Username = "admin",
                Salt = "1538510101653331210551178015792467638",
                Password = "MTUzODUxMDEwMTY1MzMzMYAlrryBJvXVMoOdPjKDOZAqVIjM",
                BuildingId = 2,
                Email = "mail@mail.pl",
                IsActive = true,
                RoleNo = 1
            }
        };

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

        public Users GetByUserNameAsync(string username)
        {
            var user = mockList.Where(x => x.Username.Equals(username)).FirstOrDefault();

            return user;

            //return await ConvertToDto(await _repository.GetByUserNameAsync(username));
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

        public UsersDTO Autheticate(string username, string password)
        {
            var user = GetByUserNameAsync(username);
            if (user != null)
            {
                // check password
                if (GenerateSaltedPassword(password, user.Salt).Equals(user.Password))
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("adsdfhjfjhdfgkjldfgdsdflksdjglkfdjgdfiojga;sldjapdjfsdsfjfgpdgjpgre");
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim(ClaimTypes.Name, user.Id.ToString()),
                        new Claim(ClaimTypes.Role, "Admin")
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    user.Token = tokenHandler.WriteToken(token);

                    UsersDTO dto = _mapper.Map<Users, UsersDTO>(user);
                    dto.RoleNo = (ERole)user.RoleNo;
                    dto.RoleName = dto.RoleNo.RoleNoToRoleName();
                    return dto;
                }
            }
            return null;
        }

        private string GenerateSaltedPassword(string password, string dbSalt = null)
        {

            byte[] salt;
            if (dbSalt == null)
            {
                new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            }
            else
            {
                salt = Encoding.ASCII.GetBytes(dbSalt);
            }
            Console.WriteLine();
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }
        #endregion
    }
}
