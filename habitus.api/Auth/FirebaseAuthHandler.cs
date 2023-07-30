using System.Security.Claims;
using System.Text.Encodings.Web;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

namespace habitus.api.Auth;

public class FirebaseAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public FirebaseAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock) : base(options, logger, encoder, clock)
    {
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
        {
            return AuthenticateResult.Fail("Missing Authorization Header");
        }

        string bearerToken = Context.Request.Headers["Authorization"];

        if (bearerToken == null || !bearerToken.StartsWith("Bearer "))
        {
            return AuthenticateResult.Fail("Invalid Authorization Header");
        }

        string token = bearerToken.Substring("Bearer ".Length).Trim();

        try
        {
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

            return AuthenticateResult.Success(new AuthenticationTicket(
                new ClaimsPrincipal(
                    new ClaimsIdentity[]
                    {
                        new (ToClaims(decodedToken), nameof(FirebaseAuthHandler))
                    }
                ), JwtBearerDefaults.AuthenticationScheme)
            );
        }
        catch (Exception ex)
        {
            return AuthenticateResult.Fail(ex.Message);
        }
    }

    private IEnumerable<Claim>? ToClaims(FirebaseToken decodedToken)
    {
        return new Claim[]
        {
            new("userId", decodedToken.Uid)
        };
    }
}
