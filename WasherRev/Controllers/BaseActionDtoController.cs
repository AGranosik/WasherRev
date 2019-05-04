using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WasherRev.Backend.Services.Interfaces;

namespace WasherRev.Api.Controllers
{
    public class BaseActionDtoController<TService, Udto> : Controller
        where TService : IBaseDtoService<Udto>
        where Udto : new()
    {
        protected readonly TService _service;

        protected delegate Task<List<Udto>> MultipleResultDelegate();
        protected delegate Task<Udto> SingleResultDelegate();
        protected delegate Task NoResultDelegate();

        public BaseActionDtoController(TService service)
        {
            _service = service;
        }

        protected async Task<IActionResult> RunGetActionListAsync(MultipleResultDelegate del)
        {
            var result = await del.Invoke();

            if(result != null)
            {
                return Ok(result);
            }

            return NotFound();
        }

        protected async Task<IActionResult> RunGetActionAsync(SingleResultDelegate del)
        {
            var result = await del.Invoke();
            if (result != null)
                return Ok(result);

            return NotFound();
        }

        protected async Task<IActionResult> RunInsertActionAsync (SingleResultDelegate del)
        {
            try
            {
                var result = await del.Invoke();
                if (result != null)
                    return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound();
            }

            return null;
        }

        protected async Task<IActionResult> RunUpdateActionAsync(SingleResultDelegate del)
        {
            try
            {
                var result = await del.Invoke();
                if (result != null)
                    return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

            return null;
        }

        protected async Task<IActionResult> RunDeleteActionAsync(NoResultDelegate del)
        {
            try
            {
                await del.Invoke();
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}