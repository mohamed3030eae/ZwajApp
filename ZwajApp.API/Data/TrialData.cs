using System.Collections.Generic;
using Data;
using Models;
using Newtonsoft.Json;

namespace ZwajApp.API.Data
{
    public class TrialData
    {
        private readonly DataContext _Context;
        public TrialData(DataContext Context)
        {
            _Context = Context;

        }
     
     public void TrialUsers()
        {
            var userData=System.IO.File.ReadAllText("Data/UserTrialData.json");
            var users=JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                // string password,out byte[] passwordHash,out byte[] passwordSalt
                byte[] passwordHash,passwordSalt;
                CreatePasswordHash("password",out passwordHash,out passwordSalt);
                user.PasswordHash=passwordHash;
                user.PasswordSalt=passwordSalt;
                user.UserName=user.UserName.ToLower();
                _Context.Add(user);
            }
            _Context.SaveChanges();

        }





        
    private void  CreatePasswordHash(string password,out byte[] passwordHash,out byte[] passwordSalt)
        {
           using(var hmac= new System.Security.Cryptography.HMACSHA512())
           {
            passwordSalt=hmac.Key;
            passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
           }
        }
    }
}