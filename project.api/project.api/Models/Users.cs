using System.ComponentModel.DataAnnotations;

namespace project.api.Models
{
    public class Users
    {
        public int id { get; set; }

        public required string username { get; set; }
        public required string password { get; set; }

    }
}
