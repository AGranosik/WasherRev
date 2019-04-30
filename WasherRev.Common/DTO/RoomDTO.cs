using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.DTO
{
    public class RoomDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Floor { get; set; }
        public int Capacity { get; set; }
        public int BuildingId { get; set; }
        public BuildingDTO Building { get; set; }
        public bool IsActive { get; set; }
    }
}
