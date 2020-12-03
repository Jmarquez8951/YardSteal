using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YardSteal.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string Description { get; set; }
        public string StreetAddress { get; set; }
        public string StreetAddress2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public DateTime DatePosted { get; set; }

    }
}
