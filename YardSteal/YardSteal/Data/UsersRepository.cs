using System;
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

        public void Add(User userToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[Users]
                               ([uid]
                               ,[username]
                               ,[email]
                               ,[password]
                               ,[profilePic]
                               ,[dateJoined]
                               ,[phoneNumber])
                               Output inserted.id
                         VALUES
                               (@uid, @username, @email, @password, @profilePic, @dateJoined, @phoneNumber)";
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
    }
}
