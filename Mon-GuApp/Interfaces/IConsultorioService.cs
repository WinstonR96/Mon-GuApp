using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Request;
using Mon_GuApp.Models.DTOs.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Interfaces
{
    public interface IConsultorioService
    {

        /// <summary>
        /// Obtiene todos los consultorios
        /// </summary>
        /// <returns>retorna un listado de consultorios</returns>
        public List<ConsultorioDTO> GetConsultorios();

        public bool DeleteConsultorio(int id);

        public ConsultorioDTO GetConsultorio(int id);

        public bool Add(ConsultorioAddDTO data);
    }
}
