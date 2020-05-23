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

namespace Mon_GuApp.Services
{
    public class PacienteService : IPacienteService
    {
        public Paciente Add(Paciente user)
        {
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
                insertPaciente.Parameters.AddWithValue("@Estado", Estado.En_Espera);
                var result = insertPaciente.ExecuteNonQuery();
                if(result > 0)
                {
                    return user;
                }
            }
            return null;
        }

        public Task<Paciente> Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<Paciente> GetPacientes()
        {
            var result = new List<Paciente>();
            using (var ctx = DbContext.GetInstance())
            {
                var Query = "SELECT * FROM Paciente WHERE Estado < 2 ORDER BY TRIAGE, Id;";
                using (var comando = new SQLiteCommand(Query, ctx))
                using (var reader = comando.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        result.Add(new Paciente
                        {
                            Id = reader["Id"].ToString(),
                            Cedula = reader["Cedula"].ToString(),
                            Nombres = reader["Nombres"].ToString(),
                            Edad = reader["Edad"].ToString(),
                            Sexo = ((Sexo)Convert.ToInt32(reader["Sexo"].ToString())).ToString(),
                            Triage = ((Triage)Convert.ToInt32(reader["Triage"].ToString())).ToString().Replace("_", " "),
                            Estado = ((Estado)Convert.ToInt32(reader["Estado"].ToString())).ToString().Replace("_", " "),
                            Sintomas = reader["Sintomas"].ToString(),
                        });
                    }
                }
            }
            return result;
        }

        public void Update(EstadoPaciente data)
        {
            throw new NotImplementedException();
        }
    }
}
