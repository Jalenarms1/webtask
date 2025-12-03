using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebTask.AuthService.Infrastructure;

public class AuthDbContext : IdentityDbContext
{



    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.HasDefaultSchema("auth");
    }
}
