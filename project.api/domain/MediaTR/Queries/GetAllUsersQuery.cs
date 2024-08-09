using Core.Domain.Users;
using MediatR;
using System.Collections.Generic;

namespace Core.Mediator.Queries
{
    public class GetAllUsersQuery : IRequest<IEnumerable<User>>
    {
    }
}
