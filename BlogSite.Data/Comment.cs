using System;
using System.Text.Json.Serialization;

namespace BlogSite.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int BlogPostId { get; set; }
        [JsonIgnore]
        public BlogPost BlogPost { get; set; }
    }
}