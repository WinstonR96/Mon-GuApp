using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Mon_GuApp.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Serilog;
using Mon_GuApp.Models;
using Mon_GuApp.Services;
using Mon_GuApp.Models.DTOs.Request;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Response;

namespace Mon_GuApp.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<AuthController>();
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;

        public AuthController(IConfiguration configuration, IAuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }
        /// <summary>
        /// Realizar Login en el sistema
        /// </summary>
        /// <param name="data">Informacion para verificar</param>
        /// <returns>Retorna Token del usuario si la verificacion es correcta</returns>
        [HttpPost]
        [Route("[action]")]
        public IActionResult Login([FromBodyAttribute] LoginRequestDTO data)
        {
            try
            {
                bool exito;
                var user = _authService.Authenticate(data, out exito);
                if (exito)
                {
                    var secretKey = _configuration.GetValue<string>("SecretKey");
                    var token = _authService.GenerateToken(user, secretKey);
                    return Ok(new LoginResponseDTO()
                    {
                        data = new { user.Cedula, user.Nombres, user.Id, token }
                    });
                }
                else
                {
                    return Ok(new ResponseDTO()
                    {
                        type = "E",
                        message = "Datos Incorrectos"
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
    }
}
