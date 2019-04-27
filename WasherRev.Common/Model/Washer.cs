using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.Model
{
    public class Washer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int RoomId { get; set; }
        public int ProducerId { get; set; }
        public DateTime SinceWhne { get; set; }
        public bool IsActive { get; set; }
        public DateTime? WorkedTo { get; set; }
    }
}
