using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BlogSite.Data
{ 
        public class BlogSiteContextFactory : IDesignTimeDbContextFactory<BlogSiteContext>
        {
            public BlogSiteContext CreateDbContext(string[] args)
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}BlogSite.Web"))
                    .AddJsonFile("appsettings.json")
                    .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

                return new BlogSiteContext(config.GetConnectionString("ConStr"));
            }
        }
}
