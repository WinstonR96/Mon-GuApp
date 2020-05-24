using Mon_GuApp.Models.DTOs.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Interfaces
{
    public interface IPruebaService
    {
        public string SubirArchivo(SubirPruebaDTO data);
        public bool ProcesarPrueba(string prueba, string ADN_MON_GUA_V2);
    }
}
