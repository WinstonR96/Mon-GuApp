using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Interfaces
{
    public interface IPacienteService
    {
        /// <summary>
        /// Agrega un paciente
        /// </summary>
        /// <param name="user">informacion del paciente</param>
        public Paciente Add(Paciente user);

        /// <summary>
        /// Obtiene un paciente
        /// </summary>
        /// <param name="id">id del paciente</param>
        /// <returns>retorna el paciente solicitado</returns>
        public Task<Paciente> Get(int id);

        /// <summary>
        /// Obtiene todos los pacientes
        /// </summary>
        /// <returns>retorna un listado de paciente</returns>
        public List<Paciente> GetPacientes();

        /// <summary>
        /// Actualiza el estado de un paciente
        /// </summary>
        /// <param name="data">informacion del paciente a actualizar</param>
        public void Update(EstadoPaciente data);
    }
}
