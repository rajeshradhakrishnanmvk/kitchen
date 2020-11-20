// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.Linq;
using kitchen_idserver.Services;
using kitchen_idserver.Storage;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServerHost.Quickstart.UI;
using IdentityServer4.Services;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson.Serialization.Conventions;


namespace kitchen_idserver
{
    public class Startup
    {
        public IWebHostEnvironment Environment { get; }
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            Environment = environment;
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
             services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            //.AllowCredentials()
                            );
                });
            services.AddControllersWithViews();
            // services.Configure<ForwardedHeadersOptions>(options =>
            // {
            //     options.ForwardedHeaders =
            //         ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto | ForwardedHeaders.XForwardedHost;
            //     options.KnownNetworks.Clear();
            //     options.KnownProxies.Clear();
            // });

 
            var builder = services.AddIdentityServer(options =>
            {
                options.IssuerUri = Configuration.GetValue<string>("ISSUER_URI");
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
            })
            .AddMongoRepository(
                Configuration.GetValue<string>("MONGO_CONNECTION"),
                Configuration.GetValue<string>("MONGO_DATABASE_NAME"))
            .AddClients()
            .AddIdentityApiResources()
            .AddPersistedGrants();
     
            services.ConfigureApplicationCookie(config =>
                {
                    config.Cookie.Name = "Identity.Cookie";
                    config.LoginPath = "/Auth/Login";
                    config.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax;
                });

            seedDatabase(services);

            builder.AddProfileService<ProfileService>();

            // not recommended for production - you need to store your key material somewhere secure
            builder.AddDeveloperSigningCredential();

            services.AddSingleton<ICorsPolicyService, RepositoryCorsPolicyService>();
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseRouting();
            //app.UseForwardedHeaders();
            // app.Use((context, next) =>
            // {
            //     context.Request.Protocol = "https";
            //     context.Request.Host = new HostString(Configuration.GetValue<string>("IdentityServerPublicFacingUri"));
            //     //  Only if you need it.
            //     context.Request.PathBase = new PathString("/");

            //     return next();
            // });
            app.UseCors("CorsPolicy");
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.Lax,
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }

        private void seedDatabase(IServiceCollection services)
        {
            configureMongoDriverIgnoreExtraElements();

            var sp = services.BuildServiceProvider();
            var repository = sp.GetService<IRepository>();

            if (repository.All<Client>().Count() == 0)
            {
                foreach (var client in Config.Clients(Configuration.GetValue<string>("CLIENT_URI")))
                {
                    repository.Add<Client>(client);
                }
            }

            if (repository.All<IdentityResource>().Count() == 0)
            {
                foreach (var res in Config.Ids)
                {
                    repository.Add<IdentityResource>(res);
                }
            }

            if (repository.All<ApiResource>().Count() == 0)
            {
                foreach (var api in Config.Apis)
                {
                    repository.Add<ApiResource>(api);
                }
            }

            
            if (repository.All<ApiScope>().Count() == 0)
            {
                foreach (var scope in Config.Scopes)
                {
                    repository.Add<ApiScope>(scope);
                }
            }

            if (repository.All<TestUser>().Count() == 0)
            {
                foreach (var user in TestUsers.Users)
                {
                    repository.Add<TestUser>(user);
                }
            }
        }

        private void configureMongoDriverIgnoreExtraElements()
        {
            var pack = new ConventionPack();
            pack.Add(new IgnoreExtraElementsConvention(true));
            ConventionRegistry.Register("IdentityServer Mongo Conventions", pack, t => true);
        }
    }
}