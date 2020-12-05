﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YardSteal.Data;
using YardSteal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace YardSteal.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        PostsRepository _repo;
        public PostsController()
        {
            _repo = new PostsRepository();
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            var allPosts = _repo.GetPosts();

            return Ok(allPosts);
        }

        [HttpPost]
        public IActionResult CreateNewPost(Post newPost)
        {
            _repo.Add(newPost);

            return Created($"api/posts/{newPost.Id}", newPost);
        }

        [HttpDelete("{postId}")]
        public IActionResult RemovePost(int postId)
        {
            if (_repo.GetById(postId) == null)
            {
                NotFound();
            }

            _repo.Remove(postId);

            return Ok();
        }
    }
}
