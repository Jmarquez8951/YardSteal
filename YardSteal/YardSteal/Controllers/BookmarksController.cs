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
    [Route("api/bookmarks")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        BookmarksRepository _repo;
        public BookmarksController()
        {
            _repo = new BookmarksRepository();
        }

        [HttpGet]
        public IActionResult GetAllBookMarks()
        {
            var allBookmarks = _repo.GetBookmarks();

            return Ok(allBookmarks);
        }
    }
}