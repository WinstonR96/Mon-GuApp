using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Interfaces
{
    public interface IAuthService
    {
        /// <summary>
        /// Metodo para realizar la autenticacion del usuario
        /// </summary>
        /// <param name="data">Datos para hacer el login [email][password]</param>
        /// <returns>retorna el usuario y token jwt, sino el mensaje de error</returns>
        public Medico Authenticate(LoginRequestDTO data, out bool exito);
        /// <summary>
        /// Permite generar el token JWT
        /// </summary>
        /// <param name="user">Usuario que intenta loguear</param>
        /// <param name="secretKey">Clave secreta</param>
        /// <returns>retorna el token JWT</returns>
        public string GenerateToken(Medico user, string secretKey);
    }
}
