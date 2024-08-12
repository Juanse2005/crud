using Core.Domain.Users;
using MediatR;
using System.Text.Json.Serialization;

namespace Core.Mediator.Commands
{
    public class UpdateUserCommand : IRequest<User>
    {
        [JsonIgnore]
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
