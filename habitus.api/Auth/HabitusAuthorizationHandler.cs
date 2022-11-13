using Microsoft.AspNetCore.Authorization;
using habitus.api.Models;

namespace habitus.api.Auth;

public class SameUserAuthorizationRequirement : IAuthorizationRequirement
{
}

public class HabitusAuthorizationHandler : AuthorizationHandler<SameUserAuthorizationRequirement, IHabitusResource>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SameUserAuthorizationRequirement requirement, IHabitusResource resource)
    {
        string? userId = context.User.Claims.First(c => c.Type == "userId")?.Value;

        if (context.User.HasClaim(c => c.Type == "userId") && userId == resource.UserId)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}