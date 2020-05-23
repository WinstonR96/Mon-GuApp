using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Mon_GuApp.Helpers
{
    /// <summary>
    /// Clase Utils, Helper que contiene metodos de uso general
    /// </summary>
    public static class Utils
    {
        /// <summary>
        /// Genera SHA256 de un string
        /// </summary>
        /// <param name="str">Cadena a encriptar</param>
        /// <returns>retorna Hash de la cadena</returns>
        public static string GetSHA256(string str)
        {
            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = sha256.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }  
        
    }
}
