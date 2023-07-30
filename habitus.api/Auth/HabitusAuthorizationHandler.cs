using habitus.api.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace habitus.api.Auth;

public class SameUserAuthorizationRequirement : IAuthorizationRequirement
{
}

public class HabitusAuthorizationHandler : AuthorizationHandler<SameUserAuthorizationRequirement, IHasUserId>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SameUserAuthorizationRequirement requirement, IHasUserId resource)
    {
        string? userId = context.User.Claims.First(c => c.Type == "userId")?.Value;

        if (userId == resource.UserId)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}