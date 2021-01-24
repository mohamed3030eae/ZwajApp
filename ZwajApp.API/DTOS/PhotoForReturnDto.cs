using System;

namespace ZwajApp.API.DTOS
{
    public class PhotoForReturnDto
    {
        public int id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string publicId { get; set; }
    }
}