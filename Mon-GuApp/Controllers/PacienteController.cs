using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Mon_GuApp.Helpers;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PacienteController: ControllerBase
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<AuthController>();
        private readonly IConfiguration _configuration;
        private readonly IPacienteService _pacienteService;

        public PacienteController(IConfiguration configuration, IPacienteService pacienteService)
        {
            _configuration = configuration;
            _pacienteService = pacienteService;
        }

        /// <summary>
        /// Obtener todos los pacientes
        /// </summary>
        /// <returns>retorna un listado de usuarios</returns>
        [HttpGet]
        public ActionResult<List<Paciente>> GetUsers()
        {
            return _pacienteService.GetPacientes();
        }
    }
}
