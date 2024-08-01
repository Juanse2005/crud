using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using project.api.Context;
using project.api.Interfaces;
using project.api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configuración de Swagger/OpenAPI
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
});

// Agregar servicios
builder.Services.AddScoped<IAuthService, AuthService>();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            // Reemplaza con la URL de tu frontend
            policy.WithOrigins("http://localhost:4200") // La URL de tu frontend
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configuración de la base de datos
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("connectionmysql"),
        new MySqlServerVersion(new Version(8, 0, 39))));

var app = builder.Build();

// Configura el pipeline de solicitud HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Habilitar CORS (debe ir antes de app.UseAuthorization() y app.MapControllers())
app.UseCors("AllowSpecificOrigin");

// Autorización
app.UseAuthorization();

// Mapear los controladores
app.MapControllers();

app.Run();
