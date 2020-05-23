using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mon_GuApp.Models.DTOs.Response
{
    public class ResponseObjectDTO
    {
        /// <summary>
        /// Tipo de mensaje
        /// </summary>
        public string type { get; set; }
        /// <summary>
        /// Mensaje
        /// </summary>
        public string message { get; set; }
        /// <summary>
        /// Objeto
        /// </summary>
        public object data { get; set; }
    }
}
