using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.DTO
{
    public class WasherDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public RoomDTO Room { get; set; }
        public ProducerDTO Producer { get; set; }
        public DateTime SinceWhne { get; set; }
        public bool IsActive { get; set; }
        public DateTime? WorkedTo { get; set; }
    }
}
