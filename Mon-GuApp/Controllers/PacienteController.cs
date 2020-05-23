using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Mon_GuApp.Helpers;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Response;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
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
        /// <returns>retorna un listado de paciente</returns>
        [HttpGet]
        public ActionResult<List<Paciente>> GetUsers()
        {
            return _pacienteService.GetPacientes();
        }

        /// <summary>
        /// Agregar nuevo paciente
        /// </summary>
        /// <param name="data">Informacion del nuevo paciente</param>
        /// <returns>Si es exitoso retorna el nuevo paciente, sino retorna el error</returns>
        [HttpPost]
        public IActionResult Add([FromBody] Paciente data)
        {
            if (data == null)
                return BadRequest();

            try
            {
                var user = _pacienteService.Add(data);
                return Ok(new ResponseDTO()
                {
                    message = "Paciente creado",
                    type = "I"
                });
            }
            catch (Exception ex)
            {
                return Ok(new ResponseDTO()
                {
                    message = ex.Message,
                    type = "E"
                });
            }
        }
    }
}
