using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Brasachef_API.Data;
using Brasachef_API.Models;

namespace AssadosCombate_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly AppDataContext _context;

        public ClienteController(AppDataContext context)
        {
            _context = context;
        }

        // GET: api/Cliente
        [HttpGet]
         [Route("getAll")]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
          if (_context.Clientes == null)
          {
              return NotFound();
          }
            return await _context.Clientes.ToListAsync();
        }

       [HttpGet]
    [Route("getByNome/{nome}")]
    public IActionResult GetByNome([FromRoute] string nome)
    {
    try
    {
        Cliente cliente = _context.Clientes.FirstOrDefault(x => x.Nome == nome);
        if (cliente != null)
        {
            return Ok(cliente);
        }
        return NotFound($"O cliente '{nome}' não foi encontrado.");
    }
    catch (Exception e)
    {
        return BadRequest($"Erro ao buscar Cliente: {e.Message}");
    }
    }


        // GET: api/Cliente/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
          if (_context.Clientes == null)
          {
              return NotFound();
          }
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        // PUT: api/Cliente/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
         [HttpPut]
        [Route("put/{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente cliente)
        {
            if (id != cliente.ClienteId)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

         [HttpPost]
        [Route("post")]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            try
            {
               
                _context.Clientes.Add(cliente);
                _context.SaveChanges();

                return Created("", cliente);
            }
            catch (Exception e)
            {
                return BadRequest($"Erro ao criar cliente: {e.Message}");
            }
        }

        // DELETE: api/Cliente/5
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            if (_context.Clientes == null)
            {
                return NotFound();
            }
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClienteExists(int id)
        {
            return (_context.Clientes?.Any(e => e.ClienteId == id)).GetValueOrDefault();
        }
    }
}
