using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        //ctor for snipper
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        // GET api/users
        [HttpGet]
        // public IEnumerable<string> Get()
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            //Maps the properties of user model to the UserForListDTO, IEnumerable because it returns many users
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDTO>>(users);

            return Ok(usersToReturn);
            // return Ok(users);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        // public string Get(int id)
        public async Task<ActionResult> GetUser(int id)
        {
            // return "value";
            var user = await _repo.GetUser(id);

            // Maps the properties of user model to the UserForDetailDTO
            var userToReturn = _mapper.Map<UserForDetailDTO>(user);

            return Ok(userToReturn);
            // return Ok(user);
        } //Check on Postman

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

}