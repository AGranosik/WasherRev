using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WasherRev.Common.DTO;
using WasherRev.Common.Model;

namespace WasherRev.Api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Building, BuildingDTO>().ReverseMap();
            CreateMap<BuildingUser, BuildingUserDTO>().ReverseMap();
            CreateMap<Users, UsersDTO>().ReverseMap();
            CreateMap<Producer, ProducerDTO>().ReverseMap();
            CreateMap<Room, RoomDTO>().ReverseMap();
            CreateMap<Reservation, ReservationDTO>().ReverseMap();
            CreateMap<Washer, WasherDTO>().ReverseMap();
            CreateMap<Users, FullUsersDTO>().ReverseMap();

        }
    }
}
