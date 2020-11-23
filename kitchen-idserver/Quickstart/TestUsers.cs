// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityModel;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Json;
using IdentityServer4;

namespace IdentityServerHost.Quickstart.UI
{
    public class TestUsers
    {
        public static List<TestUser> Users = new List<TestUser>
        {
            new TestUser{SubjectId = "1", Username = "rajesh", Password = "rajesh",
                Claims =
                {
                    new Claim("bookservice", "admin"),
                    new Claim("chapterservice", "admin"),
                }
            },
            new TestUser{SubjectId = "2", Username = "raj", Password = "raj",
                Claims =
                {
                    new Claim("microservice1", "user"),
                }
            }
        };
    }
}