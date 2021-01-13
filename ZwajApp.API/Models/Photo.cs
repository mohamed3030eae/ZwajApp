using System;

namespace Models
{
    public class Photo
    {
        public int id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        // relation  1 to many
        public User User { get; set; }
        public int UserId { get; set; }
    }
}