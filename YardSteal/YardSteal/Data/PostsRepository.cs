using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using YardSteal.Models;

namespace YardSteal.Data
{
    public class PostsRepository
    {
        const string _connectionString = "Server = localhost; Database = YardSteal; Trusted_Connection = True;";

        public IEnumerable<Post> GetPosts()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Posts";

            var posts = db.Query<Post>(sql);

            return posts;
        }

        public Post GetById(int postId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Posts
                        where Id = @id";

            var param = new { id = postId };

            var singlePost = db.QueryFirstOrDefault<Post>(sql, param);

            return singlePost;
        }

        public IEnumerable<Post> GetLatestPosts()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = "select * from Posts order by datePosted desc";

            var posts = db.Query<Post>(sql);

            return posts;
        }

        public IEnumerable<Post> GetOldestPosts()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = "select * from Posts order by datePosted asc";

            var posts = db.Query<Post>(sql);

            return posts;
        }

        public void  Add(Post postToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $@"INSERT INTO [dbo].[Posts]
                               ([uid]
                               ,[description]
                               ,[streetAddress]
                               ,[streetAddress2]
                               ,[city]
                               ,[state]
                               ,[zipcode]
                               ,[datePosted])
                               Output inserted.id
                         VALUES
                               (@uid, @description, @streetAddress, @streetAddress2, @city, @state, @zipcode, @datePosted)";

            var newId = db.ExecuteScalar<int>(sql, postToAdd);

            postToAdd.Id = newId;
        }

        public void Remove(int postId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM [dbo].[Posts]
                        WHERE Id = @id";

            var param = new { id = postId };

            db.Execute(sql, param);
        }
    }
}
