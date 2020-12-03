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
    }
}
