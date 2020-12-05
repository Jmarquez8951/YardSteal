using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YardSteal.Data;
using YardSteal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace YardSteal.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepository _repo;

        public UsersController()
        {
            _repo = new UsersRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repo.GetUsers();

            return Ok(allUsers);
        }

        [HttpPost]
        public IActionResult CreateNewUser(User newUser)
        {
            _repo.Add(newUser);

            return Created($"/api/users/{newUser.Id}", newUser);
        }

        [HttpDelete("{userId}")]
        public IActionResult RemoveUser(int userId)
        {
            if (_repo.GetById(userId) == null)
            {
                return NotFound();
            }

            _repo.Remove(userId);

            return Ok();
        }

        [HttpPut("{userId}")]
        public IActionResult UpdateUser(int userId, User userToUpdate)
        {
            if (_repo.GetById(userId) == null)
            {
                return NotFound();
            }

            var updatedUser = _repo.Update(userId, userToUpdate);

            return Ok(updatedUser);
        }
    }
}
