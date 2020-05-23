using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Serilog;
using Microsoft.Extensions.Configuration;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Helpers;
using Mon_GuApp.Models.DTOs.Response;
using Microsoft.AspNetCore.Authorization;
using Mon_GuApp.Models.DTOs.Request;

namespace Mon_GuApp.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class ConsultorioController: ControllerBase
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<ConsultorioController>();
        private readonly IConfiguration _configuration;
        private readonly IConsultorioService _consultorioService;

        public ConsultorioController(IConfiguration configuration, IConsultorioService consultorioService)
        {
            _configuration = configuration;
            _consultorioService = consultorioService;
        }

        /// <summary>
        /// Obtener todos los consultorios
        /// </summary>
        /// <returns>retorna un listado de consultorios</returns>
        [HttpGet]
        public ActionResult<List<ConsultorioDTO>> GetConsultorios()
        {
            return _consultorioService.GetConsultorios();
        }

        /// <summary>
        /// Obtener un consultorio
        /// </summary>
        /// <param name="id">id del consultorio a consultaar</param>
        /// <returns>retorna un listado de consultorio</returns>
        [HttpGet("{id}")]
        public ActionResult<ConsultorioDTO> GetConsultorio(int id)
        {
            return _consultorioService.GetConsultorio(id);
        }

        /// <summary>
        /// elimina un consultorio
        /// </summary>
        /// <param name="id">id del consultorio a eliminar</param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (_consultorioService.DeleteConsultorio(id))
                {
                    return Ok(new ResponseDTO()
                    {
                        type = "I",
                        message = "Eliminado sastifactoriamente"
                    });
                }
                else
                {
                    return Ok(new ResponseDTO()
                    {
                        type = "E",
                        message = "Ocurrio un error"
                    });
                }

            }
            catch (Exception ex)
            {
                return Ok(new ResponseDTO()
                {
                    type = "E",
                    message = ex.Message
                });
            }

        }

        /// <summary>
        /// Agregar nuevo consultorio
        /// </summary>
        /// <param name="data">Informacion del nuevo consultorio</param>
        /// 
        [HttpPost]
        public IActionResult Add([FromBody] ConsultorioAddDTO data)
        {
            if (data == null)
                return BadRequest();

            try
            {
                var user = _consultorioService.Add(data);
                if (user)
                {
                    return Ok(new ResponseDTO()
                    {
                        message = "Consultorio creado",
                        type = "I"
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
    }
}
