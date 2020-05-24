using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Mon_GuApp.Helpers;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Response;
using Serilog;
using System.Collections.Generic;

namespace Mon_GuApp.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class MedicoController: ControllerBase
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<MedicoController>();
        private readonly IConfiguration _configuration;
        private readonly IMedicoService _medicoService;

        public MedicoController(IConfiguration configuration, IMedicoService medicoService)
        {
            _configuration = configuration;
            _medicoService = medicoService;
        }

        /// <summary>
        /// Obtener todos los medicos disponibles
        /// </summary>
        /// <returns>retorna un listado de medicos disponible</returns>
        [HttpGet]
        public ActionResult<List<MedicoDTO>> GetConsultorios()
        {
            return _medicoService.ObtenerMedicosDisponibles();
        }
    }
}
