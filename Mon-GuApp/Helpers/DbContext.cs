using Microsoft.Extensions.PlatformAbstractions;
using System.Data.SQLite;
using System.IO;

namespace Mon_GuApp.Helpers
{
    public class DbContext
    {
        private static readonly string dbpath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "monguapp.sqlite");

        public static SQLiteConnection GetInstance()
        {
            var db = new SQLiteConnection(string.Format("Data Source={0};Version=3;", dbpath));
            db.Open();
            return db;
        }
    }
}
