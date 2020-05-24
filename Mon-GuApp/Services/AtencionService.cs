using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Request;
using System;
using Serilog;
using Mon_GuApp.Helpers;
using Mon_GuApp.Models;
using System.Data.SQLite;
using Mon_GuApp.Enums;

namespace Mon_GuApp.Services
{
    public class AtencionService : IAtencionService
    {
        private readonly ILogger log = LoggerApp.Instance.GetLogger.ForContext<AtencionService>();

        public bool DarAltaPaciente(string id, out string mensaje)
        {
            log.Information("Dando de alta al paciente");
            bool res = false;
            Consultorio consultorio = new Consultorio();
            using (var ctx = DbContext.GetInstance())
            {
                //Actualizamos el estado del paciente
                SQLiteCommand estadoPaciente = new SQLiteCommand();
                estadoPaciente.Connection = ctx;
                estadoPaciente.CommandText = "UPDATE Paciente SET Estado = @Estado, Triage = @nuevoTriage WHERE Id = @Id";
                estadoPaciente.Parameters.AddWithValue("@Estado", Enums.EstadoPaciente.Recuperado);
                estadoPaciente.Parameters.AddWithValue("@nuevoTriage", Enums.Triage.Fuera);
                estadoPaciente.Parameters.AddWithValue("@Id", id);
                var resultadoEstadoPaciente = estadoPaciente.ExecuteNonQuery();
                if (resultadoEstadoPaciente > 0)
                {
                    //Actualizamos el estado del consultorio
                    SQLiteCommand estadoConsultorio = new SQLiteCommand();
                    estadoConsultorio.Connection = ctx;
                    estadoConsultorio.CommandText = "UPDATE Consultorio SET Estado = @NuevoEstado WHERE Id = (SELECT c.Id FROM Atencion AS a INNER JOIN Consultorio AS c ON c.Id = a.Id_consultorio WHERE a.Estado = @EstadoAtencion AND a.Id_paciente = @paciente_id)";
                    estadoConsultorio.Parameters.AddWithValue("@NuevoEstado", Enums.EstadoConsultorio.Disponible);
                    estadoConsultorio.Parameters.AddWithValue("@EstadoAtencion", Enums.EstadoAtencion.Iniciada);
                    estadoConsultorio.Parameters.AddWithValue("@paciente_id", id);
                    var resultadoEstadoConsultorio = estadoConsultorio.ExecuteNonQuery();
                    if (resultadoEstadoConsultorio > 0)
                    {
                        //Actualizamos el estado de la consulta
                        SQLiteCommand estadoConsulta = new SQLiteCommand();
                        estadoConsulta.Connection = ctx;
                        estadoConsulta.CommandText = "UPDATE Atencion SET Estado = @EstadoNuevo WHERE Id_paciente = @Id_paciente AND Estado = @EstadoViejo";
                        estadoConsulta.Parameters.AddWithValue("@EstadoNuevo", Enums.EstadoAtencion.Terminada);
                        estadoConsulta.Parameters.AddWithValue("@EstadoViejo", Enums.EstadoAtencion.Iniciada);
                        estadoConsulta.Parameters.AddWithValue("@Id_paciente", id);
                        var resultadoEstadoConsulta = estadoConsulta.ExecuteNonQuery();
                        if (resultadoEstadoConsulta > 0)
                        {
                            res = true;
                            mensaje = "Paciente dado de alta";
                            log.Information(mensaje);
                        }
                        else
                        {
                            mensaje = "No se pudo actualizar el estado de la consulta";
                            log.Information(mensaje);
                        }
                    }
                    else
                    {
                        mensaje = "No se pudo actualizar el estado del consultorio";
                        log.Information(mensaje);
                    }
                }
                else
                {
                    mensaje = "No se pudo actualizar el estado del paciente";
                    log.Information(mensaje);
                }
            }
            return res;
        }

        public bool LlamarPaciente(ConsultorioLlamaPaciente data, out string mensaje, out Paciente dataPaciente)
        {
            log.Information("Llamando paciente");
            bool res = false;
            Paciente paciente = new Paciente();
            using (var ctx = DbContext.GetInstance())
            {
                //Se busca el paciente proximo a atender
                var Query = "SELECT * FROM Paciente WHERE Estado != 2 ORDER BY TRIAGE, Id LIMIT 1;";
                SQLiteCommand pacienteCommand = new SQLiteCommand();
                pacienteCommand.Connection = ctx;
                pacienteCommand.CommandText = Query;
                using (var reader = pacienteCommand.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            paciente.Id = reader["Id"].ToString();
                            paciente.Cedula = reader["Cedula"].ToString();
                            paciente.Nombres = reader["Nombres"].ToString();
                            paciente.Edad = reader["Edad"].ToString();
                            paciente.Sexo = ((Sexo)Convert.ToInt32(reader["Sexo"].ToString())).ToString();
                            paciente.Triage = ((Triage)Convert.ToInt32(reader["Triage"].ToString())).ToString().Replace("_", " ");
                            paciente.Estado = ((Enums.EstadoPaciente)Convert.ToInt32(reader["Estado"].ToString())).ToString().Replace("_", " ");
                            paciente.Sintomas = reader["Sintomas"].ToString();
                        }
                        log.Information($"Se encontro el paciente {paciente.Cedula}");

                        //Si se encuentra se procede a realizar la atencion
                        SQLiteCommand atencioncomando = new SQLiteCommand();
                        atencioncomando.Connection = ctx;
                        atencioncomando.CommandText = "INSERT INTO Atencion(Id_paciente,Id_consultorio, Estado) VALUES (@Id_paciente,@Id_consultorio, @Estado)";
                        atencioncomando.Parameters.AddWithValue("@Id_paciente", paciente.Id);
                        atencioncomando.Parameters.AddWithValue("@Id_consultorio", data.Id_consultorio);
                        atencioncomando.Parameters.AddWithValue("@Estado", Enums.EstadoAtencion.Iniciada);
                        var result = atencioncomando.ExecuteNonQuery();
                        if (result > 0)
                        {
                            //Se actualiza el estado del paciente a En_Atencion
                            SQLiteCommand estadopaciente = new SQLiteCommand();
                            estadopaciente.Connection = ctx;
                            estadopaciente.CommandText = "UPDATE Paciente SET Estado = @Estado WHERE Id =@Id_paciente";
                            estadopaciente.Parameters.AddWithValue("@Id_paciente", paciente.Id);
                            estadopaciente.Parameters.AddWithValue("@Estado", Enums.EstadoPaciente.En_Atencion);
                            var resultadoActualizacion = estadopaciente.ExecuteNonQuery();
                            if (resultadoActualizacion > 0)
                            {
                                //Se actualiza el estado del consultorio a ocupado
                                SQLiteCommand estadoConsultorio = new SQLiteCommand();
                                estadoConsultorio.Connection = ctx;
                                estadoConsultorio.CommandText = "UPDATE Consultorio SET Estado = @Estado WHERE Id =@Id_consultorio";
                                estadoConsultorio.Parameters.AddWithValue("@Id_consultorio", data.Id_consultorio);
                                estadoConsultorio.Parameters.AddWithValue("@Estado", Enums.EstadoConsultorio.Ocupado);
                                var resultadoActualizacionConsultorio = estadoConsultorio.ExecuteNonQuery();
                                if (resultadoActualizacionConsultorio > 0)
                                {
                                    res = true;
                                    mensaje = "Atencion agendada";
                                    log.Information(mensaje);
                                }
                                else
                                {
                                    mensaje = "No fue posible actualizar el estado del consultorio";
                                    log.Information(mensaje);
                                }
                            }
                            else
                            {
                                mensaje = "No fue posible actualizar el estado del paciente";
                                log.Information(mensaje);
                            }
                        }
                        else
                        {
                            mensaje = "Se produjo un error agendando la atencion";
                            log.Information(mensaje);
                        }

                    }
                    else
                    {
                        mensaje = "No se encontro paciente";
                        log.Information(mensaje);
                    }
                }

            }
            dataPaciente = paciente;
            return res;
        }

        public Paciente ObtenerPacienteEnConsulta(int id)
        {
            log.Information("Obteniendo paciente");
            Paciente paciente = new Paciente();
            //Se busca el paciente proximo a atender
            using (var ctx = DbContext.GetInstance())
            {
                var Query = "SELECT p.* FROM Atencion AS a INNER JOIN Consultorio AS c ON c.Id = a.Id_consultorio INNER JOIN Paciente AS p ON p.Id = a.Id_paciente WHERE c.Id = @id_consultorio AND a.Estado = 0";
                SQLiteCommand pacienteCommand = new SQLiteCommand();
                pacienteCommand.Connection = ctx;
                pacienteCommand.CommandText = Query;
                pacienteCommand.Parameters.AddWithValue("@id_consultorio", id);
                using (var reader = pacienteCommand.ExecuteReader())
                {
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            paciente.Id = reader["Id"].ToString();
                            paciente.Cedula = reader["Cedula"].ToString();
                            paciente.Nombres = reader["Nombres"].ToString();
                            paciente.Edad = reader["Edad"].ToString();
                            paciente.Sexo = ((Sexo)Convert.ToInt32(reader["Sexo"].ToString())).ToString();
                            paciente.Triage = ((Triage)Convert.ToInt32(reader["Triage"].ToString())).ToString().Replace("_", " ");
                            paciente.Estado = ((Enums.EstadoPaciente)Convert.ToInt32(reader["Estado"].ToString())).ToString().Replace("_", " ");
                            paciente.Sintomas = reader["Sintomas"].ToString();
                        }
                        log.Information($"Se encontro el paciente {paciente.Cedula}");
                    }
                }
            }
            return paciente;
        }
    }
}
