using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.DTO
{
    public class BuildingUserDTO
    {
        public int Id { get; set; }
        public UsersDTO Users { get; set; }
        public BuildingDTO Building { get; set; }
        public DateTime SinceWhen { get; set; }
        public DateTime? AssignedTo { get; set; }
    }
}
