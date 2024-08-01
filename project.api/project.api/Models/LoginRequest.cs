using System.ComponentModel.DataAnnotations;

namespace project.api.Models
{
    public class LoginRequest
    {
        public required string username { get; set; }
        public required string password { get; set; }

    }
}
namespace MS.Models
{
    public class AuthResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}
