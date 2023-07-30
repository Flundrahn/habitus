using Microsoft.AspNetCore.Mvc;

namespace habitus.api.Controllers
{
    public abstract class HabitusControllerBase : ControllerBase
    {
        protected string GetUserId() => HttpContext.User.Claims.First(c => c.Type == "userId").Value;
    }
}
