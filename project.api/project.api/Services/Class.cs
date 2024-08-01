using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MS.Models;
using project.api.Context;
using project.api.Interfaces;
using project.api.Models;

namespace project.api.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _dbContext;

        public AuthService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            // Buscar el usuario por nombre de usuario
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.username == request.username);

            // Verificar si el usuario existe y si la contraseña es correcta
            if (user == null || user.password != request.password)
            {
                return new AuthResponse { Success = false, Message = "Invalid credentials" };
            }

            // Aquí podrías generar un token si lo necesitas
            // Pero para autenticación básica sin JWT, solo retornamos éxito

            return new AuthResponse { Success = true, Message = "Login successful" };
        }
    }
}
