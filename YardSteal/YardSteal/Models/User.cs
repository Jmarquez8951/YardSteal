using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YardSteal.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ProfilePic { get; set; }
        public DateTime DateJoined { get; set; }
        public string PhoneNumber { get; set; }
    }
}
