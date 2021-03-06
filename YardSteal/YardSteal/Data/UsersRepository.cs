﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using YardSteal.Models;

namespace YardSteal.Data
{
    public class UsersRepository
    {
        const string _connectionString = "Server = localhost; Database = YardSteal; Trusted_Connection = True;";
        
        public IEnumerable<User> GetUsers()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"select * from Users order by Id";

            var users = db.Query<User>(sql);

            return users;
        }

        public User GetById(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Users
                        where Id = @id";

            var param = new { id = userId };

            var singleUser = db.QueryFirstOrDefault<User>(sql, param);

            return singleUser;
        }

        public User GetByUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT * FROM Users
                        WHERE usersUid = @UID";

            var param = new { UID = uid };

            var user = db.QueryFirstOrDefault<User>(sql, param);

            return user;
        }

        public IEnumerable<Post> GetPostsByUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select * from Posts
                        where [uid] = @UID";

            var param = new { UID = uid };

            var posts = db.Query<Post>(sql, param);

            return posts;
        }

        public IEnumerable<Post> GetBookmarksByUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select postId, p.Id, p.[uid], title, [description], streetAddress, streetAddress2, city, state, zipcode, datePosted from Bookmarks b
                        join Posts p 
	                        on p.id = b.postId
                        where b.[uid] = @UID";

            var param = new { UID = uid };

            var bookmarks = db.Query<Post>(sql, param);

            return bookmarks;
        }

        public void Add(User userToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[Users]
                               ([usersUid]
                               ,[username]
                               ,[email]
                               ,[password]
                               ,[profilePic]
                               ,[dateJoined]
                               ,[phoneNumber])
                               Output inserted.id
                         VALUES
                               (@usersUid, @username, @email, @password, @profilePic, @dateJoined, @phoneNumber)";
            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.Id = newId;
        }

        public void Remove(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM [dbo].[Users]
                        WHERE Id = @id";

            var param = new { id = userId };

            db.Execute(sql, param);

        }

        public User Update(int userId, User userToUpdate)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE [dbo].[Users]
                           SET [username] = @username 
                              ,[profilePic] = @profilePic
                              ,[phoneNumber] = @phoneNumber
                         WHERE Id = @id";

            var parameters = new
            {
                userToUpdate.Username,
                userToUpdate.ProfilePic,
                userToUpdate.PhoneNumber,
                id = userId
            };

            var updatedUser = db.QueryFirstOrDefault<User>(sql, parameters);

            return updatedUser;
        }
    }
}
