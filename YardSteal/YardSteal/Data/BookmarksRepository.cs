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

        public void Add(Bookmark bookmarkToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $@"INSERT INTO [dbo].[Bookmarks]
                               ([uid]
                               ,[postId])
                               Output inserted.id
                         VALUES
                               (@uid, @postId)";

            var newId = db.ExecuteScalar<int>(sql, bookmarkToAdd);

            bookmarkToAdd.Id = newId;
        }
    }
}
