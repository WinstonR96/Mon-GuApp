using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Mon_GuApp.Helpers;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Request;
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
    public class PruebaController: ControllerBase
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<PruebaController>();
        private readonly IConfiguration _configuration;
        private readonly IPruebaService _pruebaService;

        public PruebaController(IConfiguration configuration, IPruebaService pruebaService)
        {
            _configuration = configuration;
            _pruebaService = pruebaService;
        }

        /// <summary>
        /// Permite subir una prueba y almacenarla en el servidor para luego hacer la verificación
        /// </summary>
        /// <param name="file">Datos para subir el archivo al servidor</param>
        /// <returns></returns>

        [HttpPost]
        public ActionResult SubirPrueba([FromBody] SubirPruebaDTO file)
        {
            try
            {
                var ADN_MON_GUA_V2 = _configuration.GetValue<string>("ADN_MON_GUA_V2");
                var data = _pruebaService.SubirArchivo(file);
                var resultado = _pruebaService.ProcesarPrueba(data, ADN_MON_GUA_V2);
                if (resultado)
                {
                    return Ok(new ResponseDTO()
                    {
                        type = "I",
                        message = "Positivo para Mon-Gua V2"
                    });
                }
                else
                {
                    return Ok(new ResponseDTO()
                    {
                        type = "I",
                        message = "Negativo para Mon-Gua V2"
                    });
                }
            }catch(Exception ex)
            {
                return Ok(new ResponseDTO()
                {
                    type = "E",
                    message = "Ocurrio un error procesando la prueba"
                });
            }
        }
    }
}
