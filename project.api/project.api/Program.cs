using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using project.api.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configuración de Swagger/OpenAPI
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
});

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Habilitar CORS
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
