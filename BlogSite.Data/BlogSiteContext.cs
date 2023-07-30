using Microsoft.EntityFrameworkCore;


namespace BlogSite.Data
{
    public class BlogSiteContext : DbContext
    {
        private readonly string _connectionString;

        public BlogSiteContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Comment> Comments { get; set; }


    }
}
