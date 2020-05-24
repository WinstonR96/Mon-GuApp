using Mon_GuApp.Interfaces;
using Mon_GuApp.Models.DTOs.Request;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Services
{
    public class PruebaService : IPruebaService
    {
        public bool ProcesarPrueba(string prueba, string ADN_MON_GUA_V2)
        {
            //string ADN_MON_GUA_V2 = "TTCGGAGTAACACGCCTATAGGCGTGTTACTCCGAA";
            string ADN = File.ReadAllText(prueba);
            if (ADN.Contains(ADN_MON_GUA_V2))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public string SubirArchivo(SubirPruebaDTO data)
        {
            string dataFile = data.file.Substring(data.file.LastIndexOf(',') + 1);
            string path = @"C:\monguapp\PruebasADN\";
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string FileName = (DateTime.Now.ToString("yyyyMMddHHmmss") + "-" + data.cedula + ".txt").ToLower();
            string file = path + FileName;
            byte[] tempBytes = Convert.FromBase64String(dataFile);
            File.WriteAllBytes(file, tempBytes);
            return file;
        }
    }
}
