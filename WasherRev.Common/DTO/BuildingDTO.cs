using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WasherRev.Common.DTO
{
    public class BuildingDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public int StreetNo { get; set; }
        [RegularExpression("[0-9]{2}-[0-9]{3}" , ErrorMessage = "Niepoprawny kod pocztowy")]
        public string PostCode { get; set; }
        public bool IsActive { get; set; }
    }
}
