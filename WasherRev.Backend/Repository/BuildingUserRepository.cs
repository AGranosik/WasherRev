﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Repository
{
    public class BuildingUserRepository : BaseRepository<BuildingUser>, IBuildingUserRepository
    {
        public BuildingUserRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
