using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.DTO
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public UsersDTO Users { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public WasherDTO Washer { get; set; }
    }
}
