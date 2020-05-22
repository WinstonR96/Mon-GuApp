using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Models.DTOs.Response
{
    public class ResponseDTO
    {
        /// <summary>
        /// Tipo de mensaje
        /// </summary>
        public string type { get; set; }
        /// <summary>
        /// Mensaje
        /// </summary>
        public string message { get; set; }
    }
}
