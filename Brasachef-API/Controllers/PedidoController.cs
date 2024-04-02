using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Brasachef_API.Data;
using Brasachef_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Brasachef_API.Controllers
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

        // GET: api/Pedido/getAll
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            try
            {
                List<Pedido> pedidos = _context.Pedidos
                    .Include(x => x.Cliente)
                    .Include(x => x.Itens) /
                        .ThenInclude(x => x.Produto)
                    .ToList();

                return pedidos.Count == 0 ? NotFound("Não existem pedidos!") : Ok(pedidos);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/Pedido/id
        [HttpGet("{id}")]
        [Route("getById/{id}")]
        public async Task<ActionResult<Pedido>> GetPedido(int id)
        {
            try
            {
                Pedido pedido = await _context.Pedidos
                    .Include(x => x.Cliente)
                    .Include(x => x.Itens)
                        .ThenInclude(x => x.Produto)
                    .FirstOrDefaultAsync(x => x.PedidoId == id);

                return pedido == null ? NotFound("Pedido não encontrado!") : Ok(pedido);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // PUT: api/Pedido/id
        [HttpPut("{id}")]
        [Route("put/{id}")]
        public async Task<IActionResult> PutPedido(int id, Pedido pedido)
        {
            if (id != pedido.PedidoId)
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

        // POST: api/Pedido/post
        [HttpPost]
        [Route("post")]
        public IActionResult Post([FromBody] Pedido pedido)
        {
            try
            {
                Cliente cliente = _context.Clientes.Find(pedido.ClienteId);

                if (cliente == null)
                {
                    return NotFound("O cliente informado não existe!");
                }

                pedido.CreatedAt = DateTime.UtcNow;
                pedido.Cliente = cliente;

                double valorTotal = 0;
                foreach (var item in pedido.Itens)
                {

                    Produto produto = _context.Produtos.Find(item.ProdutoId);
                    if (produto == null)
                    {
                        return NotFound("O produto do item não existe!");
                    }

                    if (produto.Preco.HasValue)
                    {
                        valorTotal += produto.Preco.Value * item.Quantidade;
                    }
                    else
                    {
                        return BadRequest("O preço do produto é nulo!");
                    }
                }

                pedido.ValorTotal = valorTotal;

                _context.Pedidos.Add(pedido);
                _context.SaveChanges();

                return Created("", pedido);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/Pedido/id
        [HttpDelete("{id}")]
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
            return (_context.Pedidos?.Any(e => e.PedidoId == id)).GetValueOrDefault();
        }
    }
}
