using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Response;
using System;
using System.Collections.Generic;
using Serilog;
using System.Linq;
using System.Threading.Tasks;
using Mon_GuApp.Helpers;
using System.Data.SQLite;

namespace Mon_GuApp.Services
{
    public class ConsultorioService : IConsultorioService
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<ConsultorioService>();
        public List<ConsultorioDTO> GetConsultorios()
        {
            log.Information("Obteniendo consultorios");
            var result = new List<ConsultorioDTO>();
            using (var ctx = DbContext.GetInstance())
            {
                var Query = "SELECT C.Id, C.Cod_Consultorio AS Codigo, C.Estado, M.Nombres AS Medico FROM Consultorio AS C, Medico AS M WHERE C.Id_medico = M.Id;";
                using (var comando = new SQLiteCommand(Query, ctx))
                using (var reader = comando.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new ConsultorioDTO
                        {
                            Id = reader["Id"].ToString(),
                            Codigo = reader["Codigo"].ToString(),
                            Estado = ((Enums.EstadoConsultorio)Convert.ToInt32(reader["Estado"].ToString())).ToString(),
                            Medico = reader["Medico"].ToString(),
                        });
                    }
                    log.Information($"Se encontraron {result.Count} consultorios");
                }
            }
            return result;
        }
    }
}
