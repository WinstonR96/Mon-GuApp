using Serilog;
using Serilog.Core;

namespace Mon_GuApp.Helpers
{
    public class LoggerApp
    {
        private static LoggerApp instance = null;
        private static readonly object padLock = new object();
        private string LogFileName { get; set; }
        private string FormatLine { get; set; }

        /// <summary>
        /// Obtiene la instancia actual
        /// </summary>
        public Logger GetLogger { get; set; }

        /// <summary>
        /// Obtiene la instancia actual de la clase.
        /// </summary>
        public static LoggerApp Instance
        {
            private set
            {
                instance = value;
            }
            get
            {
                lock (padLock)
                {
                    if (instance == null)
                    {
                        instance = new LoggerApp();
                    }

                    return instance;
                }
            }
        }

        public LoggerApp()
        {
            ConfigLog();
        }

        /// <summary>
        /// Configura log con nombre de archivo
        /// </summary>
        public LoggerApp(string fullFileName)
        {
            instance = this;
            LogFileName = fullFileName;
            ConfigLog();
        }

        public LoggerApp(string fullFileName, string formatLine)
        {
            instance = this;
            LogFileName = fullFileName;
            FormatLine = formatLine;
            ConfigLog();
        }

        private void ConfigLog()
        {
            //Archivo de log
            if (string.IsNullOrEmpty(LogFileName))
            {
                LogFileName = @"C:\monguapp\log.txt";
            }
            //Formato de línea de registro de log.
            if (string.IsNullOrEmpty(FormatLine))
            {
                FormatLine = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff}    [{Level:u3}]    [{SourceContext}]   {Message}{NewLine}{Exception}";
            }

            //
            GetLogger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.Console(outputTemplate: FormatLine)
                .WriteTo.RollingFile(LogFileName, outputTemplate: FormatLine)
                .CreateLogger();
        }
    }
}