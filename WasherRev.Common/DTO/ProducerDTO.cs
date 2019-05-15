using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WasherRev.Common.DTO
{
    public class ProducerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Phone]
        public string ServicePhoneNo { get; set; }
    }
}
