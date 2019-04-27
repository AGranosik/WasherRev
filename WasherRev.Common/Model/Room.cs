using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.Model
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Floor { get; set; }
        public int Capacity { get; set; }
        public int BuildingId { get; set; }
        public bool IsActive { get; set; }
    }
}
