using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.Model
{
    public class BuildingUser
    {
        public int Id { get; set; }
        public int UsersId { get; set; }
        public int BuildingId { get; set; }
        public DateTime SinceWhen { get; set; }
        public DateTime? AssignedTo { get; set; }
    }
}
