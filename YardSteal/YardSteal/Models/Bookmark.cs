using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YardSteal.Models
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string Uid { get; set; }
        public int PostId { get; set; }
    }
}
