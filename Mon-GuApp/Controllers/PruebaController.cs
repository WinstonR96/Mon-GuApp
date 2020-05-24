﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Mon_GuApp.Helpers;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Request;
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

        [HttpPost]
        public ActionResult SubirPrueba([FromBody] SubirPruebaDTO file)
        {
            _pruebaService.SubirArchivo(file);
            return Ok();
        }
    }
}
