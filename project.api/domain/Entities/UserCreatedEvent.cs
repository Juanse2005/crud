using MediatR;

namespace Core.Domain.Users
{
    public class UserCreatedEvent : INotification
    {
        public User User { get; }

        public UserCreatedEvent(User user)
        {
            User = user;
        }
    }
}
