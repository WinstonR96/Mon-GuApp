﻿using Serilog;
using Mon_GuApp.Enums;
using Mon_GuApp.Helpers;
using Mon_GuApp.Interfaces;
using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Request;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Threading.Tasks;
using Mon_GuApp.Models.DTOs.Response;

namespace Mon_GuApp.Services
{
    public class PacienteService : IPacienteService
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<PacienteService>();
        public Paciente Add(Paciente user)
        {
            log.Information("Registrando paciente nuevo");
            using (var ctx = DbContext.GetInstance())
            {
                SQLiteCommand insertPaciente = new SQLiteCommand();
                insertPaciente.Connection = ctx;
                insertPaciente.CommandText = "INSERT INTO Paciente(Cedula,Nombres,Edad,Sexo,Triage,Sintomas,Estado) VALUES (@Cedula,@Nombres,@Edad,@Sexo,@Triage,@Sintomas,@Estado)";
                insertPaciente.Parameters.AddWithValue("@Cedula", user.Cedula);
                insertPaciente.Parameters.AddWithValue("@Nombres", user.Nombres);
                insertPaciente.Parameters.AddWithValue("@Edad", user.Edad);
                insertPaciente.Parameters.AddWithValue("@Sexo", user.Sexo);
                insertPaciente.Parameters.AddWithValue("@Triage", user.Triage);
                insertPaciente.Parameters.AddWithValue("@Sintomas", user.Sintomas);
                insertPaciente.Parameters.AddWithValue("@Estado", Enums.EstadoPaciente.En_Espera);
                var result = insertPaciente.ExecuteNonQuery();
                if(result > 0)
                {
                    log.Information("Registrado exitosamente");
                    return user;
                }
                log.Information("Ocurrio un error al registrar");
            }
            return null;
        }

        public Task<Paciente> Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<ListadoPacientes> GetPacientes()
        {
            log.Information("Obteniendo pacientes");
            var result = new List<ListadoPacientes>();
            using (var ctx = DbContext.GetInstance())
            {
                var Query = "SELECT Paciente.*, Consultorio.Id AS Id_consultorio, Consultorio.Cod_Consultorio AS Codigo FROM Paciente LEFT JOIN Atencion ON Atencion.Id_paciente = Paciente.Id LEFT JOIN Consultorio ON Atencion.Id_consultorio = Consultorio.Id ORDER BY Paciente.Triage, Paciente.Id;";
                using (var comando = new SQLiteCommand(Query, ctx))
                using (var reader = comando.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new ListadoPacientes()
                        {
                            paciente = new Paciente()
                            {
                                Id = reader["Id"].ToString(),
                                Cedula = reader["Cedula"].ToString(),
                                Nombres = reader["Nombres"].ToString(),
                                Edad = reader["Edad"].ToString(),
                                Sexo = ((Sexo)Convert.ToInt32(reader["Sexo"].ToString())).ToString(),
                                Triage = ((Triage)Convert.ToInt32(reader["Triage"].ToString())).ToString().Replace("_", " "),
                                Estado = ((Enums.EstadoPaciente)Convert.ToInt32(reader["Estado"].ToString())).ToString().Replace("_", " "),
                                Sintomas = reader["Sintomas"].ToString(),
                            },
                            consultorio = new ConsultorioDTO()
                            {
                                Codigo = reader["Codigo"].ToString(),
                                Id = reader["Id_consultorio"].ToString()
                            }
                        });
                    }
                    log.Information($"Se encontraron {result.Count} pacientes");
                }
            }
            return result;
        }
    }
}
