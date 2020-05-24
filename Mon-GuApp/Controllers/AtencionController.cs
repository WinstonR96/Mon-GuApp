using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Serilog;
using Mon_GuApp.Helpers;
using Mon_GuApp.Interfaces;
using Microsoft.Extensions.Configuration;
using Mon_GuApp.Models.DTOs.Request;
using Mon_GuApp.Models.DTOs.Response;
using Mon_GuApp.Models;

namespace Mon_GuApp.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class AtencionController : ControllerBase
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<AtencionController>();
        private readonly IConfiguration _configuration;
        private readonly IAtencionService _atencionService;

        public AtencionController(IConfiguration configuration, IAtencionService atencionService)
        {
            _configuration = configuration;
            _atencionService = atencionService;
        }

        /// <summary>
        /// Obtener un paciente en atencion
        /// </summary>
        /// <param name="id">id del consultorio a consultar</param>
        /// <returns>retorna un paciente en consultorio</returns>
        [HttpGet("{id}")]
        public ActionResult<Paciente> GetConsultorio(int id)
        {
            return _atencionService.ObtenerPacienteEnConsulta(id);
        }

        /// <summary>
        /// Procesar una atencion
        /// </summary>
        /// <param name="data">Informacion requerida para llamar un paciente</param>
        /// 
        [HttpPost]
        public IActionResult Add([FromBody] ConsultorioLlamaPaciente data)
        {
            string mensaje = "";
            Paciente p = new Paciente();
            if (data == null)
                return BadRequest();

            try
            {

                var res = _atencionService.LlamarPaciente(data, out mensaje, out p);
                if (res)
                {
                    return Ok(new ResponseObjectDTO()
                    {
                        message = mensaje,
                        type = "I",
                        data = p
                    });
                }
                else
                {
                    return Ok(new ResponseDTO()
                    {
                        message = "No se pudo crear el consultorio",
                        type = "E"
                    });
                }

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

        /// <summary>
        /// Dar de alta
        /// </summary>
        /// <param name="data">Informacion requerida para dar de alta a un paciente</param>
        /// 
        [HttpPut]
        public IActionResult Update([FromBody] PacienteAltaDTO data)
        {
            string mensaje = "";
            if (data == null)
                return BadRequest();

            try
            {

                var res = _atencionService.DarAltaPaciente(data.Id, out mensaje);

                return Ok(new ResponseDTO()
                {
                    message = mensaje,
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
