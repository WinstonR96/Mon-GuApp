using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Response;
using System;
using System.Collections.Generic;
using Serilog;
using System.Linq;
using System.Threading.Tasks;
using Mon_GuApp.Helpers;
using System.Data.SQLite;
using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Request;
using Mon_GuApp.Enums;

namespace Mon_GuApp.Services
{
    public class ConsultorioService : IConsultorioService
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<ConsultorioService>();

        public bool Add(ConsultorioAddDTO data)
        {
            log.Information("Agregando consultorio");
            bool res = false;
            using (var ctx = DbContext.GetInstance())
            {
                SQLiteCommand insertConsultorio = new SQLiteCommand();
                insertConsultorio.Connection = ctx;
                insertConsultorio.CommandText = "INSERT INTO Consultorio(Cod_Consultorio, Id_medico, Estado) VALUES (@Cod,@Medico,@Estado)";
                insertConsultorio.Parameters.AddWithValue("@Cod", data.Cod_Consultorio);
                insertConsultorio.Parameters.AddWithValue("@Medico", Convert.ToInt32(data.Id_medico));
                insertConsultorio.Parameters.AddWithValue("@Estado", Enums.EstadoConsultorio.Disponible);
                var result = insertConsultorio.ExecuteNonQuery();
                if (result > 0)
                {
                    SQLiteCommand actualizarMedico = new SQLiteCommand();
                    actualizarMedico.Connection = ctx;
                    actualizarMedico.CommandText = "UPDATE Medico SET Estado = @estado_medico WHERE Id = @Id";
                    actualizarMedico.Parameters.AddWithValue("@Id", Convert.ToInt32(data.Id_medico));
                    actualizarMedico.Parameters.AddWithValue("@estado_medico", Enums.EstadoMedico.Asignado);
                    var resultado = actualizarMedico.ExecuteNonQuery();
                    if (resultado > 0)
                    {
                        log.Information("Registrado exitosamente");
                        res = true;
                    }
                    log.Information("Ocurrio un error al actualizar estado del medico");
                }
                log.Information("Ocurrio un error al registrar");
            }
            return res;
        }

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
                if (result > 0)
                {
                    res = true;
                }
            }
            return res;
        }

        public ConsultorioDTO GetConsultorio(int id)
        {
            log.Information($"Obteniendo consultorio con id: {id}");
            var Result = new ConsultorioDTO();
            using (var ctx = DbContext.GetInstance())
            {
                var Query = "SELECT C.Id, C.Cod_Consultorio AS Codigo, C.Estado, M.Nombres AS Medico FROM Consultorio AS C, Medico AS M WHERE C.Id_medico = M.Id AND C.Id = @Id;";
                SQLiteCommand consultorio = new SQLiteCommand();
                consultorio.Connection = ctx;
                consultorio.CommandText = Query;
                consultorio.Parameters.AddWithValue("@Id", id);
                using (var reader = consultorio.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Result.Id = reader["Id"].ToString();
                        Result.Codigo = reader["Codigo"].ToString();
                        Result.Estado = ((Enums.EstadoConsultorio)Convert.ToInt32(reader["Estado"].ToString())).ToString();
                        Result.Medico = reader["Medico"].ToString();

                    }
                    log.Information($"Se encontro el consultorio {Result.Codigo}");
                }
            }
            return Result;
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
