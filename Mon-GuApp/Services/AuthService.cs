using Microsoft.IdentityModel.Tokens;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Request;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Mon_GuApp.Services
{
    public class AuthService : IAuthService
    {
        public Medico Authenticate(LoginRequestDTO data, out bool exito)
        {
            User user = new User() {Cedula="1",Password="1"};
            Medico medico = new Medico() { Cedula = "1", Id = "1", Nombres = "John Does", User = user };
            if (data.User.Cedula.Equals(medico.User.Cedula) && data.User.Password.Equals(medico.User.Password))
            {
                exito = true;
                return medico;
            }
            exito = false;
            return null;
        }

        public string GenerateToken(Medico user, string secretKey)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            // Creamos los claims (pertenencias, características) del usuario
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Nombres),
                new Claim(JwtRegisteredClaimNames.NameId, user.Cedula),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                // Nuestro token va a durar un día
                Expires = DateTime.UtcNow.AddDays(1),
                // Credenciales para generar el token usando nuestro secretykey y el algoritmo hash 256
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);
            var encodeToken = tokenHandler.WriteToken(createdToken);

            return encodeToken;
        }
    }
}
