using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace SignalRChatDemo.DTO
{
    public class UserDto
    {
        [Required]
        [StringLength(15,MinimumLength =3 ,ErrorMessage ="Name must be at least {2} and maximum {15} chareter")]

        public string Name { get; set; }    

    }
}
