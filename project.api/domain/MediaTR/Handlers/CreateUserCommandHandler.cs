using Core.Domain.Users;
using Core.Interfaces;
using Core.Mediator.Commands;
using MediatR;

namespace Core.Mediator.Handlers
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMediator _mediator;

        public CreateUserCommandHandler(IUserRepository userRepository, IMediator mediator)
        {
            _userRepository = userRepository;
            _mediator = mediator;
        }

        public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                Username = request.Username,
                Password = request.Password
            };

            await _userRepository.AddAsync(user);

            await _mediator.Publish(new UserCreatedEvent(user), cancellationToken);

            return user.Id;
        }
    }
}