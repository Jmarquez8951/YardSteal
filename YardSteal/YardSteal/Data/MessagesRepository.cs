using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using YardSteal.Models;

namespace YardSteal.Data
{
    public class MessagesRepository
    {
        const string _connectionString = "Server = localhost; Database = YardSteal; Trusted_Connection = True;";
        public IEnumerable<Message> GetMessages()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Messages";

            var messages = db.Query<Message>(sql);

            return messages;
        }

        public void Add(Message messageToAdd)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $@"INSERT INTO [dbo].[Messages]
                               ([uid]
                               ,[description]
                               ,[datePosted]
                               ,[postId])
                               Output inserted.id
                         VALUES
                               (@uid, @description, @datePosted, @postId)";

            var newId = db.ExecuteScalar<int>(sql, messageToAdd);

            messageToAdd.Id = newId;
        }
    }
}
