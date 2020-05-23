using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Serilog;
using Mon_GuApp.Helpers;
using System.Data.SQLite;

namespace Mon_GuApp.Services
{
    public class MedicoService : IMedicoService
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<MedicoService>();
        public List<MedicoDTO> ObtenerMedicosDisponibles()
        {
            log.Information("Obteniendo consultorios");
            var result = new List<MedicoDTO>();
            using (var ctx = DbContext.GetInstance())
            {
                var Query = "SELECT Id, Nombres FROM Medico WHERE Estado = 1";
                using (var comando = new SQLiteCommand(Query, ctx))
                using (var reader = comando.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new MedicoDTO
                        {
                            Id = reader["Id"].ToString(),
                            Nombres = reader["Nombres"].ToString(),
                        });
                    }
                    log.Information($"Se encontraron {result.Count} medicos");
                }
            }
            return result;
        }
    }
}
