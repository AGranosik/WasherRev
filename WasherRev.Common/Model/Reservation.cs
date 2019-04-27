using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.Model
{
    public class Reservation
    {
        public int Id { get; set; }
        public int? UsersId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int WasherId { get; set; }
    }
}
