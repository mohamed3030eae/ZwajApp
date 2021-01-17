using System.ComponentModel.DataAnnotations;

namespace ZwajApp.API.DTOS
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        // [StringLength(8,MinimumLength=4,ErrorMessage="كلمة المرور يجب أن لا تقل عن أربعة حروف ولا تزيد عن ثمانية حروف ")]
        public string Password  { get; set; }
    }
}