using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WasherRev.Backend.Repository.Interface;
using WasherRev.Backend.Services.Interfaces;

namespace WasherRev.Common.Extensions
{
    public static class UsersRepositoryExtension
    {
        public static async Task<IUsersRepository> CheckIfUserExists(this IUsersRepository repository, int userId)
        {
            var user = await repository.GetById(userId);
            if (user == null)
                throw new Exception("Nie można znaleźć użytkownika");
            return repository;
        }
    }
}
