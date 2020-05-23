using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Models
{
    public class Consultorio
    {
        public int Id { get; set; }
        public string Cod_Consultorio { get; set; }
        public int Id_medico { get; set; }
        public string Estado { get; set; }
    }
}
