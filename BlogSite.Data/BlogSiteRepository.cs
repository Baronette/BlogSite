using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BlogSite.Data
{
    public class BlogSiteRepository
    {
        private readonly string _connection;
        private readonly string _password = "$2a$11$PNxWyp/UZbeaKR/Vm.hI4uHyAeRN9AIgb0HUXlbzdlZ/9JrjpfFJy";

        public BlogSiteRepository(string connection)
        {
            _connection = connection;
        }
        public List<BlogPost> GetAll()
        {
            using var context = new BlogSiteContext(_connection);
            return context.BlogPosts.Include(bp => bp.Comments).OrderByDescending(bp => bp.Date).ToList();
        }
        public void AddPost(BlogPost blogPost)
        {
            using var context = new BlogSiteContext(_connection);
            context.BlogPosts.Add(blogPost);
            context.SaveChanges();

        }
        public BlogPost GetPost(int id)
        {
            using var context = new BlogSiteContext(_connection);
            return context.BlogPosts.Include(bp => bp.Comments).FirstOrDefault(bp => bp.Id == id);
        }
        public void AddComment(Comment comment)
        {
            using var context = new BlogSiteContext(_connection);
            context.Comments.Add(comment);
            context.SaveChanges();
        }
        public int GetMostRecent()
        {
            using var context = new BlogSiteContext(_connection);
            return context.BlogPosts.OrderByDescending(p => p.Date).Select(p => p.Id).FirstOrDefault();
        }
        public List<Comment> GetComments(int id)
        {
            using var context = new BlogSiteContext(_connection);
            return context.Comments.Where(c => c.BlogPostId == id).ToList();
        }

        public bool Login(string password)
        {
            return BCrypt.Net.BCrypt.Verify(password, _password);
        }
        public void Delete(int id)
        {
            using var context = new BlogSiteContext(_connection);
            context.BlogPosts.Remove(GetPost(id));
            context.SaveChanges();
        }
    }
}