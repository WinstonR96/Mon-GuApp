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
        /// Agrega un usuario
        /// </summary>
        /// <param name="user">informacion del usuario</param>
        public Paciente Add(Paciente user);

        /// <summary>
        /// Obtiene un usuario
        /// </summary>
        /// <param name="id">id del usuario</param>
        /// <returns>retorna el usuario solicitado</returns>
        public Task<Paciente> Get(int id);

        /// <summary>
        /// Obtiene todos los usuarios
        /// </summary>
        /// <returns>retorna un listado de usuarios</returns>
        public List<Paciente> GetUsers();

        /// <summary>
        /// Actualiza un usuario
        /// </summary>
        /// <param name="data">informacion del usuario a actualizar</param>
        public void Update(EstadoPaciente data);
    }
}
