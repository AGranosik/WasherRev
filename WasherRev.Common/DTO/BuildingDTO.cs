using System;
using System.Collections.Generic;
using System.Text;

namespace WasherRev.Common.DTO
{
    public class BuildingDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public int StreetNo { get; set; }
        public string PostCode { get; set; }
        public bool IsActive { get; set; }
    }
}
