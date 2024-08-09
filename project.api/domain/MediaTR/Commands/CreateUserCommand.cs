using MediatR;

namespace Core.Mediator.Commands
{
    public class CreateUserCommand : IRequest<int>
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
