using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalRChatDemo.Controllers.Service;
using SignalRChatDemo.DTO;

namespace SignalRChatDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;   
        public ChatController(ChatService chatService)
        {
            _chatService = chatService; 
            
        }

        [HttpPost("registered-user")]
        public IActionResult RegisterUser(UserDto model)
        {
            if (_chatService.AdduserList(model.Name))
            {
                //204 code
                return NoContent(); 
            }
            return BadRequest("This Name is taken please choose different one ");    
        }

    }
}
