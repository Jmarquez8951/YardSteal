using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YardSteal.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace YardSteal.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        MessagesRepository _repo;

        public MessagesController()
        {
            _repo = new MessagesRepository();
        }

        [HttpGet]
        public IActionResult GetAllMessages()
        {
            var allMessages = _repo.GetMessages();

            return Ok(allMessages);
        }

    }
}
