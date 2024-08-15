using System.Collections.Generic;
using System.Linq;

namespace SignalRChatDemo.Controllers.Service
{
    public class ChatService
    {
        /// <summary>
        /// Key value pair
        /// </summary>
        private static readonly Dictionary<string ,string> Users = new Dictionary<string ,string>();

        /// <summary>
        ///  The lock statement ensures that the block of code within it is thread-safe, 
        ///  meaning that only one thread can execute it at a time.
        ///  This prevents race conditions when multiple threads are trying to access 
        ///  or modify the Users dictionary simultaneously.
        /// </summary>
        /// <param name="userToAdd"></param>
        /// <returns></returns>
        public bool AdduserList(string userToAdd)
        {
            lock (Users) {
                foreach (var item in Users)
                {
                    if(item.Key.ToLower() == userToAdd.ToLower())
                    {
                        return false;
                    }
                    
                }
                Users.Add(userToAdd, null);
                return true;    
            }
        }


        public void AddUserConnectionId(string user ,string connectionId )
        {
            lock (Users) { 

                if(Users.ContainsKey(user)) {

                    Users[user] = connectionId;
                }
            
            }
        }

        public string GetUserByConnectionId(string connectionId) {

            lock(Users) {
            
                return Users.Where(x=>x.Value == connectionId).Select(x=>x.Key).FirstOrDefault();        
            }
        }

        public string GetConnectionIdByUser(string user)
        {

            lock (Users)
            {

                return Users.Where(x => x.Value == user).Select(x => x.Value).FirstOrDefault();
            }
        }

        public void RemoveUserFromList(string user)
        {

            lock (Users)
            {

               if(Users.ContainsKey(user)) { 


                    Users.Remove(user);
                }
            }
        }


        public string[] GetOnlineUsers()
        {
            lock(Users) { 
            
            return Users.OrderBy(x => x.Key).Select(x=>x.Key).ToArray();   
            
            }
        }



    }
}
