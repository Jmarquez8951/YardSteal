using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using YardSteal.Models;

namespace YardSteal.Data
{
    public class BookmarksRepository
    {
        const string _connectionString = "Server = localhost; Database = YardSteal; Trusted_Connection = True;";

        public IEnumerable<Bookmark> GetBookmarks()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Bookmarks";

            var bookmarks = db.Query<Bookmark>(sql);

            return bookmarks;
        }
    }
}
