using Microsoft.AspNetCore.SignalR;
using SignalRChatDemo.Controllers.Service;
using SignalRChatDemo.DTO;
using System;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace SignalRChatDemo.HUBS
{
    public class ChatHub : Hub
    {
        ChatService _chatSevice;
        public ChatHub(ChatService chatSevice)
        {
                _chatSevice = chatSevice;
        }


        /// <summary>
        /// Function is default in hub
        /// </summary>
        /// <returns></returns>
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Come2Chat");
            await Clients.Caller.SendAsync("UserConnected");
        }


        /// <summary>
        /// Function is default in hub
        /// </summary>
        /// <returns></returns>

 
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Come2Chat");
            var user = _chatSevice.GetUserByConnectionId(Context.ConnectionId);
            _chatSevice.RemoveUserFromList(user);

            await DisplayOnlineUsers();
            await base.OnDisconnectedAsync(exception);

            // Notify clients about the disconnection if needed
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        }


        public async Task  AddUserConnectionId(string name)
        {
            _chatSevice.AddUserConnectionId(name, Context.ConnectionId);

            await DisplayOnlineUsers();
        }


        private async Task DisplayOnlineUsers()
        {
            var onlineUsers = _chatSevice.GetOnlineUsers();
            await Clients.Groups("Come2Chat").SendAsync("OnlineUsers", onlineUsers);
        }


        public async Task ReceiveMessage(MessageDTO message)
        {
            await Clients.Group("Come2Chat").SendAsync("NewMessage", message);
        }

    }
}
