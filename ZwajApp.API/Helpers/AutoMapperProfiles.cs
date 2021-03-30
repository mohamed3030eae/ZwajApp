using System.Linq;
using AutoMapper;
using Models;
using ZwajApp.API.DTOS;
using ZwajApp.API.Models;

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
            CreateMap<MessageForCreationDto,Message>().ReverseMap();
            CreateMap<Message,MessageToReturnDto>()
            .ForMember(dest => dest.SenderPhotoUrl,opt => {opt.MapFrom(src => src.Sender.Photos.FirstOrDefault
            (p => p.IsMain).Url);})
            .ForMember(dest => dest.RecipientPhotoUrl,opt => {opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault
            (p => p.IsMain).Url);});
        }
    }
}