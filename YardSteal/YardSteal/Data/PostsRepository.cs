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

        public IEnumerable<Message> GetPostComments(int postId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = "select * from Messages where postId = @id";

            var param = new { id = postId };

            var messages = db.Query<Message>(sql, param);

            return messages;
        }

        public void  Add(Post postToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $@"INSERT INTO [dbo].[Posts]
                               ([uid]
                               ,[title]
                               ,[description]
                               ,[streetAddress]
                               ,[streetAddress2]
                               ,[city]
                               ,[state]
                               ,[zipcode]
                               ,[datePosted])
                               Output inserted.id
                         VALUES
                               (@uid, @title, @description, @streetAddress, @streetAddress2, @city, @state, @zipcode, @datePosted)";

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

        public Post Update(int postId, Post postToUpdate)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE [dbo].[Posts]
                           SET [title] = @title
                              ,[description] = @description
                              ,[streetAddress] = @streetAddress
                              ,[streetAddress2] = @streetAddress2
                              ,[city] = @city
                              ,[state] = @state
                              ,[zipcode] = @zipcode
                         WHERE Id = @id";

            var parameters = new
            {
                postToUpdate.Title,
                postToUpdate.Description,
                postToUpdate.StreetAddress,
                postToUpdate.StreetAddress2,
                postToUpdate.City,
                postToUpdate.State,
                postToUpdate.Zipcode,
                id = postId
            };

            var updatedPost = db.QueryFirstOrDefault<Post>(sql, parameters);

            return updatedPost;
        }
    }
}
