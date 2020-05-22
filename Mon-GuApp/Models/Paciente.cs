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
        public Sexo Sexo { get; set; }
        public Triage Triage { get; set; }
        public string Sintomas { get; set; }
        public Estado Estado { get; set; }
    }
}
