using Mon_GuApp.Models;
using Mon_GuApp.Models.DTOs.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Interfaces
{
    public interface IAtencionService
    {
        public bool LlamarPaciente(ConsultorioLlamaPaciente data, out string mensaje, out Paciente dataPaciente);

        public Paciente ObtenerPacienteEnConsulta(int id);
    }
}
