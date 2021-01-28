using System;
using System.ComponentModel.DataAnnotations;

namespace ZwajApp.API.DTOS
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        [StringLength(8, MinimumLength = 4, ErrorMessage = "كلمة المرور يجب أن لا تقل عن أربعة حروف ولا تزيد عن ثمانية حروف ")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }


        public UserForRegisterDTO()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }

    }



}