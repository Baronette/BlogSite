using BlogSite.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSite.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPosts : ControllerBase
    {
        private string _connection;
        private IHubContext<PostHub> _context;
        public BlogPosts(IConfiguration configuration, IHubContext<PostHub> hubContext)
        {
            _connection = configuration.GetConnectionString("constr");
            _context = hubContext;
        }
        [Route("getall")]
        [HttpGet]
        public List<BlogPost> GetAll()
        {
            var repo = new BlogSiteRepository(_connection);
            return repo.GetAll();
        }
        [Route("getpost")]
        [HttpGet]
        public BlogPost GetPost(int id)
        {
            var repo = new BlogSiteRepository(_connection);
            return repo.GetPost(id);
        }
        [HttpPost]
        [Route("addcomment")]
        public void AddComment(Comment comment)
        {
            comment.Date = DateTime.Now;
            var repo = new BlogSiteRepository(_connection);
            repo.AddComment(comment);
            _context.Clients.All.SendAsync("new-comment", comment);
        }
        [HttpGet]
        [Route("getmostrecent")]
        public int MostRecent()
        {
            var repo = new BlogSiteRepository(_connection);
            return repo.GetMostRecent();
        }
        [HttpPost]
        [Route("addpost")]
        public BlogPost AddPost(BlogPost post)
        {
            post.Date = DateTime.Now;
            var repo = new BlogSiteRepository(_connection);
            repo.AddPost(post);
            post.Comments = new List<Comment>();
            _context.Clients.All.SendAsync("new-post", post);

            return post;
        }
        [HttpGet]
        [Route("getcomments")]
        public List<Comment> GetComments(int id)
        {
            var repo = new BlogSiteRepository(_connection);
            return repo.GetComments(id);
        }
        [HttpPost]
        [Route("login")]
        public bool Login(LoginVM viewModel)
        {
            var repo = new BlogSiteRepository(_connection);
            return repo.Login(viewModel.Password);
        }
        [HttpPost]
        [Route("delete")]
        public void Delete(BlogPost post)
        {
            var repo = new BlogSiteRepository(_connection);
           repo.Delete(post.Id);
        }
    }
}
