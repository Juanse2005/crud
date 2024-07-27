using Microsoft.EntityFrameworkCore;
using project.api.Models;

namespace project.api.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        public DbSet<Users> Users { get; set; }
    }
}