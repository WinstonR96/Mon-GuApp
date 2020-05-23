using Mon_GuApp.Models.DTOs.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Interfaces
{
    public interface IMedicoService
    {
        public List<MedicoDTO> ObtenerMedicosDisponibles();
    }
}
