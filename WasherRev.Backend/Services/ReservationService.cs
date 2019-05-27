using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WasherRev.Backend.Repository;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Backend.Services.Interfaces;
using WasherRev.Common.DTO;
using WasherRev.Common.Extensions;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Services
{
    public class ReservationService : BaseService<IReservationRepository, Reservation>, IReservationService
    {
        protected readonly IUsersRepository _usersRepository;
        protected readonly IWasherRepository _washerRepository;

        public ReservationService(
            IMapper mapper,
            IReservationRepository repository,
            IUsersRepository usersRepository,
            IWasherRepository washerRepository) : base(mapper, repository)
        {
            _usersRepository = usersRepository;
            _washerRepository = washerRepository;
        }

        public async Task<List<ReservationDTO>> GetAllDTO()
        {
            var models = await _repository.GetAll();
            var dtos = new List<ReservationDTO>();

            foreach (var model in models)
            {
                var dto = await ConvertToDTO(model);
                dtos.Add(dto);
            }

            return dtos;
        }

        public async Task<ReservationDTO> GetDTOById(int id)
        {
            return await ConvertToDTO(await _repository.GetById(id));
        }

        public async Task<List<ReservationDTO>> GetReservationsForUser(DateTime date, int buildingId)
        {
            var models = await _repository.GetReservationsForUser(date, buildingId);
            var dtos = new List<ReservationDTO>();
            if (models != null)
            {
                foreach (var model in models)
                {
                    var dto = await ConvertToDTO(model);
                    dtos.Add(dto);
                }
                return dtos;
            }
            return null;
        }

        public async Task<List<ReservationDTO>> GetUsersReervations(DateTime? date, int usersId)
        {
            var models = await _repository.GetUsersReervations(date, usersId);
            var dtos = new List<ReservationDTO>();
            if (models != null)
            {
                foreach (var model in models)
                {
                    var dto = await ConvertToDTO(model);
                    dtos.Add(dto);
                }
                return dtos;
            }
            return null;
        }

        public async Task<ReservationDTO> Insert(ReservationDTO model)
        {
            var resultModel = await _repository.Insert(ConvertToPureModel(model));
            return _mapper.Map<Reservation, ReservationDTO>(resultModel);
        }

        public async Task<ReservationDTO> Update(ReservationDTO model)
        {
            var resultModel = await _repository.Update(ConvertToPureModel(model));
            return _mapper.Map<Reservation, ReservationDTO>(resultModel);
        }

        protected async Task<ReservationDTO> ConvertToDTO(Reservation model)
        {
            var dto = _mapper.Map<Reservation, ReservationDTO>(model);
            if (model.UsersId.HasValue)
            {
                dto.Users = _mapper.Map<Users, UsersDTO>(await _usersRepository.GetById(model.UsersId.Value));
            }
            dto.Washer = _mapper.Map<Washer, WasherDTO>(await _washerRepository.GetById(model.WasherId));

            return dto;
        }

        protected Reservation ConvertToPureModel(ReservationDTO dto)
        {
            var model = _mapper.Map<ReservationDTO, Reservation>(dto);
            model.UsersId = dto.Users.Id;
            model.WasherId = dto.Washer.Id;

            return model;
        }

        public async Task<ReservationDTO> MakeReservation(int reservationId, int userId)
        {
            await ReservationExists(reservationId);
            await _usersRepository.CheckIfUserExists(userId);

            var model = await _repository.MakeReservation(reservationId, userId);
            return await ConvertToDTO(model);

        }

        protected async Task ReservationExists(int reservationId)
        {
            var reservation = await _repository.GetById(reservationId);
            if (reservation == null)
                throw new Exception("Dana rezerwacja nie istnieje w bazie danych");
        }
    }
}
