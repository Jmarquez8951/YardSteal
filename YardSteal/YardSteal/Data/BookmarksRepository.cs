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

        public Bookmark GetById(int bookmarkId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Bookmarks
                        where Id = @id";

            var param = new { id = bookmarkId };

            var singleBookmark = db.QueryFirstOrDefault<Bookmark>(sql, param);

            return singleBookmark;
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

        public void Remove(int bookmarkId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM [dbo].[Bookmarks]
                        WHERE Id = @id";

            var param = new { id = bookmarkId };

            db.Execute(sql, param);
        }
    }
}
