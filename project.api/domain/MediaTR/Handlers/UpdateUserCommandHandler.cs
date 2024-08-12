using Core.Domain.Users;
using Core.Interfaces;
using Core.Mediator.Commands;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Mediator.Handlers
{
    internal class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, User>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMediator _mediator;

        public UpdateUserCommandHandler(IUserRepository userRepository, IMediator mediator)
        {
            _userRepository = userRepository;
            _mediator = mediator;
        }

        public async Task<User> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            // Obtener el usuario por ID
            var user = await _userRepository.GetByIdAsync(request.Id);

            if (user == null)
            {
                throw new Exception($"User with ID {request.Id} not found.");
            }

            // Asignar los valores actualizados
            user.Username = request.Username;
            user.Password = request.Password;

            // Actualizar el usuario en el repositorio
            await _userRepository.UpdateAsync(user);

            return user; // Retornar el usuario actualizado
        }

    }
}
