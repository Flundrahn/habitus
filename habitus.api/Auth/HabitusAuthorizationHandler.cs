using Microsoft.AspNetCore.Authorization;
using habitus.api.Models;

namespace habitus.api.Auth;

public class HabitusAuthorizationHandler : AuthorizationHandler<SameUserAuthorizationRequirement, IHabitusResource>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SameUserAuthorizationRequirement requirement, IHabitusResource resource)
    {
        if (context.User.HasClaim(c => c.Type == "userId"))
        {
            string? userId = context.User.Claims.First(c => c.Type == "userId")?.Value;

            if (userId == null) throw new Exception("UserId is null");

            if (userId != resource.UserId)
            {
                context.Fail();
            }

            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}