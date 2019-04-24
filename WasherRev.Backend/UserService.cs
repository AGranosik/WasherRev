using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace WasherRev.Backend
{
    public class UserService
    {

        //public User Authenticate(string username, string password)
        //{
        //    var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

        //    // return null if user not found
        //    if (user == null)
        //        return null;

        //    // authentication successful so generate jwt token
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new Claim[]
        //        {
        //            new Claim(ClaimTypes.Name, user.Id.ToString()),
        //            new Claim(ClaimTypes.Role, user.Role)
        //        }),
        //        Expires = DateTime.UtcNow.AddDays(7),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    user.Token = tokenHandler.WriteToken(token);

        //    // remove password before returning
        //    user.Password = null;

        //    return user;
        //}

        private string GenerateSaltedPassword(string password, string dbSalt = null)
        {

            byte[] salt;

            if (dbSalt == null)
                salt = GenerateSalt();
            else
                salt = Encoding.ASCII.GetBytes(dbSalt);

            var hashedPassword = HashPasswordWithSalt(Encoding.UTF8.GetBytes(password), salt);

            return Encoding.ASCII.GetString(hashedPassword, 0, hashedPassword.Length);
        }

        private byte[] GenerateSalt()
        {
            const int saltLength = 32;

            using (var randomNumberGenerator = new RNGCryptoServiceProvider())
            {
                var randomNumber = new byte[saltLength];
                randomNumberGenerator.GetBytes(randomNumber);

                return randomNumber;
            }
        }

        private byte[] Combine(byte[] first, byte[] second)
        {
            var ret = new byte[first.Length + second.Length];

            Buffer.BlockCopy(first, 0, ret, 0, first.Length);
            Buffer.BlockCopy(second, 0, ret, first.Length, second.Length);

            return ret;
        }

        private byte[] HashPasswordWithSalt(byte[] toBeHashed, byte[] salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var combinedHash = Combine(toBeHashed, salt);

                return sha256.ComputeHash(combinedHash);
            }
        }
    }
}
