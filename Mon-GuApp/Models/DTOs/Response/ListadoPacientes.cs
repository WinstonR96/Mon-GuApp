using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Models.DTOs.Response
{
    public class ListadoPacientes
    {
        public Paciente paciente { get; set; }
        public ConsultorioDTO consultorio { get; set; }
    }
}
