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

        public Message GetById(int messageId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Messages
                        where Id = @id";

            var param = new { id = messageId };

            var singleMessage = db.QueryFirstOrDefault<Message>(sql, param);

            return singleMessage;
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

        public void Remove(int messageId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE 
                        FROM [dbo].[Messages]
                        WHERE Id = @id";

            var param = new { id = messageId };

            db.Execute(sql, param);
        }
    }
}
