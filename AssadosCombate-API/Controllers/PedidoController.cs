using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssadosCombate_API.Data;
using AssadosCombate_API.Models;

namespace AssadosCombate_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly AppDataContext _context;

        public PedidoController(AppDataContext context)
        {
            _context = context;
        }

        // GET: api/Pedido
        [HttpGet]
        [Route("getAll")]
        public async Task<ActionResult<IEnumerable<Pedido>>> GetPedidos()
        {
          if (_context.Pedidos == null)
          {
              return NotFound();
          }
            return await _context.Pedidos.ToListAsync();
        }

        // GET: api/Pedido/5
        [HttpGet("{id}")]
        [Route("getById/{id}")]
        public async Task<ActionResult<Pedido>> GetPedido(int id)
        {
          if (_context.Pedidos == null)
          {
              return NotFound();
          }
            var pedido = await _context.Pedidos.FindAsync(id);

            if (pedido == null)
            {
                return NotFound();
            }

            return pedido;
        }

        // PUT: api/Pedido/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("put/{id}")]
        public async Task<IActionResult> PutPedido(int id, Pedido pedido)
        {
            if (id != pedido.Id)
            {
                return BadRequest();
            }

            _context.Entry(pedido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoExists(id))
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
        public IActionResult Post([FromBody] Pedido pedido)
        {
            Cliente cliente = _context.Clientes.Find(pedido.ClienteId);

            if (cliente == null)
            {
                return NotFound("Cliente não encontrado.");
            }

            Produto produto = _context.Produtos.Find(pedido.ProdutoId);

            if (produto == null)
            {
                return NotFound("Produto não encontrado.");
            }

            try
            {
                pedido.CreatedAt = DateTime.UtcNow;
                pedido.Cliente = cliente;

                _context.Pedidos.Add(pedido);
                _context.SaveChanges();

                return Created("", pedido);
            }
            catch (Exception e)
            {
                return BadRequest($"Erro ao criar Pedido: {e.Message}");
            }
        }

        // DELETE: api/Pedido/5
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeletePedido(int id)
        {
            if (_context.Pedidos == null)
            {
                return NotFound();
            }
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return NotFound();
            }

            _context.Pedidos.Remove(pedido);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PedidoExists(int id)
        {
            return (_context.Pedidos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
