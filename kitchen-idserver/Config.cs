// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace kitchen_idserver
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> Ids =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId()
            };


        public static IEnumerable<ApiResource> Apis =>
            new ApiResource[]
            {
                new ApiResource
                {
                    Name = "bookservice",
                    DisplayName = "My Microservice #1",
                    Description = "Allow the application to access Book API #1 on your behalf",
                    Scopes = new List<string> {"bookservice","chapterservice"}
                },
               new ApiResource
                {
                    Name = "chapterservice",
                    DisplayName = "My Microservice #1",
                    Description = "Allow the application to access Chapter API #1 on your behalf",
                    Scopes = new List<string> {"bookservice","chapterservice"}
                },
            };

	public static IEnumerable<ApiScope> Scopes =>
        new ApiScope[]
        {
            new ApiScope("bookservice", "Access to API #1"),
			new ApiScope("chapterservice", "Access to API #2")
        };

        public static IEnumerable<Client> Clients (string url) =>
            new Client[]
            {
                new Client
                {
                    ClientId = "AngularClient",
                    ClientName = "Angular Client",
                    ClientUri = url,
                    RequireClientSecret = false,
                    RequireConsent = false,
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RedirectUris = { url },
                    PostLogoutRedirectUris = { url },
                    AllowedCorsOrigins = { url },
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 3600,
                    AllowedScopes = { "openid", "bookservice", "chapterservice" }
                }
            };
    }
}