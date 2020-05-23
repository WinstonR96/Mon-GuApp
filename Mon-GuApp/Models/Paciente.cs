using Microsoft.AspNetCore.Authentication;
using Mon_GuApp.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Models
{
    public class Paciente
    {
        public string Id { get; set; }
        public string Cedula { get; set; }
        public string Nombres { get; set; }
        public string Edad { get; set; }
        public string Sexo { get; set; }
        public string Triage { get; set; }
        public string Sintomas { get; set; }
        public string Estado { get; set; }
    }
}
