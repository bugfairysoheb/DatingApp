using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            //compare username and password to what is stored in the database
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if(user==null)
                return null;
            //If our verified pssword does not return null/false
            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            //for a given salt
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)) 
           {
            //Compute the hash
             
             var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
             //For each computed hash
             for(int i=0; i<computedHash.Length; i++)
             {
                 //If the computer hash is NOT the same as the password hash in database
                 if(computedHash[i] != passwordHash[i]) return false;
             }
           }
           //If its the same
           return true;
        }

        public async Task<User> Register(User user, string password)
        {
            //Take password, add salt, then hash it, then create user
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //Logic for creating salt and hash
           using (var hmac = new System.Security.Cryptography.HMACSHA512()) 
           {
             passwordSalt = hmac.Key;
             passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
           }
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(x => x.Username == username)) 
                return true;
            return false;
        }
    }
}