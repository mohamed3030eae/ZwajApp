using System.Linq;
using AutoMapper;
using Models;
using ZwajApp.API.DTOS;

namespace ZwajApp.API.Helpers
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDto>()
             .ForMember(dest => dest.PhotoURL,opt => {opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);})
             .ForMember(dest => dest.Age,opt => {opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());});

            CreateMap<User,UserForDetailsDto>()
            .ForMember(dest => dest.PhotoURL,opt => {opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);})
            .ForMember(dest => dest.Age,opt => {opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());});
            
            
            CreateMap<Photo,PhotoForDetailsDto>();
            CreateMap<UserForUpdateDto,User>();
            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<PhotoForCreateDto,Photo>();
            CreateMap<UserForRegisterDTO,User>();
        }
    }
}