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

        [HttpPost]
        public IActionResult AddBookmark(Bookmark bookmarkToAdd)
        {
            var bookmarks = _repo.GetBookmarks();

            foreach (var b in bookmarks)
            {
                if (b.PostId == bookmarkToAdd.PostId && b.Uid == bookmarkToAdd.Uid)
                {
                    return StatusCode(405);
                }
            }

            _repo.Add(bookmarkToAdd);

            return Created($"api/bookmarks/{bookmarkToAdd.Id}", bookmarkToAdd);
        }

        [HttpDelete("{bookmarkId}")]
        public IActionResult RemoveBookmark(int bookmarkId)
        {
            if (_repo.GetById(bookmarkId) == null)
            {
                return NotFound();
            }

            _repo.Remove(bookmarkId);

            return Ok();
        }
    }
}
