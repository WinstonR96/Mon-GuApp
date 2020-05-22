using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Models
{
    public class Medico
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Cedula { get; set; }
        public User User { get; set; }
    }
}
