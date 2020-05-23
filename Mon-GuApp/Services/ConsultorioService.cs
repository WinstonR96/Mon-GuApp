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

        public bool DeleteConsultorio(int id)
        {
            bool res = false;
            log.Information("Eliminando usuario");
            using (var ctx = DbContext.GetInstance())
            {
                SQLiteCommand commandoDelete = new SQLiteCommand();
                commandoDelete.Connection = ctx;
                commandoDelete.CommandText = "UPDATE Consultorio SET Estado = '2' WHERE Id = @Id";
                commandoDelete.Parameters.AddWithValue("@Id", id);
                var result = commandoDelete.ExecuteNonQuery();
                if(result > 0)
                {
                    res = true;
                }
            }
            return res;
        }

        public List<ConsultorioDTO> GetConsultorios()
        {
            log.Information("Obteniendo consultorios");
            var result = new List<ConsultorioDTO>();
            using (var ctx = DbContext.GetInstance())
            {
                var Query = "SELECT C.Id, C.Cod_Consultorio AS Codigo, C.Estado, M.Nombres AS Medico FROM Consultorio AS C, Medico AS M WHERE C.Id_medico = M.Id AND C.Estado != 2;";
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
