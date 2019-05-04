﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WasherRev.Common.DTO;
using WasherRev.Common.Model;

namespace WasherRev.Backend.Services.Interfaces
{
    public interface IUsersService : IBaseDtoService<UsersDTO>
    {
        Users GetByUserNameAsync(string username);
        UsersDTO Autheticate(string username, string password);
    }
}
