using System.Collections.Generic;
using System.Threading.Tasks;
using Models;
using ZwajApp.API.Helpers;
using ZwajApp.API.Models;

namespace ZwajApp.API.Data
{
    public interface IZwajRepository
    {
        void Add <T> (T entity) where T:class;
        void Delete <T> (T entity) where T:class;
        Task<bool> SaveAll ();
        Task<PagedList<User>> GetUsers (UserParams userParams);
        Task<User> GetUser (int id);
        Task<Photo> GetPhoto (int id);
        Task<Photo> GetMainPhotoForUser (int UserId);
        Task<Like> GetLike (int UserId,int recipientId);
        Task<Message> GetMessage(int id);
         Task<PagedList<Message>> GetMessageForUser(MessageParams  messageParams);
        Task<IEnumerable<Message>> GetConversation (int UserId,int recipientId);
         Task<int> GetUnreadMessagesForUser(int userId);


    }
}