
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SignalRChatDemo.Controllers.Service;
using SignalRChatDemo.HUBS;

namespace SignalRChatDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSingleton<ChatService>();
            builder.Services.AddSignalR();
            builder.Services.AddCors();
         

            var app = builder.Build();
            app.UseCors(x => x
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           .WithOrigins("http://localhost:4200")
               .AllowCredentials()


           );
            app.UseCors("AllowAngularApp"); // Apply the CORS policy




            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            //if user be on this path then it connect to my chat hub

            app.MapHub<ChatHub>("/hubs/chat");

        
            app.Run();
        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

        }
    }
}
