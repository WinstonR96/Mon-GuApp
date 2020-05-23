using Microsoft.IdentityModel.Tokens;
using Mon_GuApp.Helpers;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Request;
using Serilog;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Mon_GuApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<AuthService>();
        public Medico Authenticate(LoginRequestDTO data, out bool exito)
        {
            log.Information("Inicio Proceso de autenticacion");
            log.Information($"Usuario a iniciar intento: {data.User.Cedula}");
            User user = new User();
            Medico medico = new Medico();
            string passEncriptada = Utils.GetSHA256(data.User.Password);
            using (var ctx = DbContext.GetInstance())
            {
                SQLiteCommand consultarUsuario = new SQLiteCommand();
                consultarUsuario.Connection = ctx;
                consultarUsuario.CommandText = "SELECT * FROM User WHERE Cedula = @Cedula AND Password = @Password";
                consultarUsuario.Parameters.AddWithValue("@Cedula", data.User.Cedula);
                consultarUsuario.Parameters.AddWithValue("@Password", passEncriptada);
                using (var readerUser = consultarUsuario.ExecuteReader())
                {
                    if (readerUser.HasRows)
                    {
                        while (readerUser.Read())
                        {
                            user.Id = Convert.ToInt32(readerUser["Id"].ToString());
                        }
                    }
                    log.Information("No se encontro un usuario con las credenciales dadas");
                }
                SQLiteCommand consultarMedico = new SQLiteCommand();
                consultarMedico.Connection = ctx;
                consultarMedico.CommandText = "SELECT * FROM Medico WHERE Id_user = @Id_user";
                consultarMedico.Parameters.AddWithValue("@Id_user", user.Id);
                using (var readerMedico = consultarMedico.ExecuteReader())
                {
                    if (readerMedico.HasRows)
                    {
                        while (readerMedico.Read())
                        {
                            medico.Id = Convert.ToInt32(readerMedico["Id"].ToString());
                            medico.Nombres = readerMedico["Nombres"].ToString();
                            medico.Cedula = readerMedico["Cedula"].ToString();
                        }
                        log.Information($"Bienvenido: {medico.Nombres}");
                        exito = true;
                        return medico;
                    }
                }
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
