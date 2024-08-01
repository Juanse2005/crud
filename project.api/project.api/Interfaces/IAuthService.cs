using System.Threading.Tasks;
using MS.Models;
using project.api.Models;

namespace project.api.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(LoginRequest request);
    }
}