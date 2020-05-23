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
        public ActionResult<List<ConsultorioDTO>> GetUsers()
        {
            return _consultorioService.GetConsultorios();
        }
    }
}
