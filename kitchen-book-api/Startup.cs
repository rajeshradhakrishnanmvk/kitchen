using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Logging;
using kitchen_api_book.Repository;
using kitchen_api_book.Service;
using kitchen_api_book.Models;

namespace kitchen_api_book
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get;  }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
             services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority = Configuration.GetValue<string>("IDENTITY_AUTHORITY");
                o.Audience = Configuration.GetValue<string>("IDENTITY_AUDIENCE");
                o.RequireHttpsMetadata = Configuration.GetValue<bool>("IDENTITY_REQUIREHTTPSMETADATA");
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim("bookservice"));
            });

            services.AddControllers();
            services.AddCors();
            services.AddScoped<IBookService, Service.BookService>();
            services.AddScoped<IBookContext, BookContext>();
            services.AddScoped<IBookRepository, BookRepository>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Books Service API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //IdentityModelEventSource.ShowPII = true; 
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(
                        options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
                        );
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Book-1 Service API V1");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGet("/", (context) => context.Response.WriteAsync("Success"));
            });
            
        }
    }
}
