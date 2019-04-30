using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Repository
{
    public class WasherRepository : BaseRepository<Washer>, IWasherRepository
    {
        public WasherRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
