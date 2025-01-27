using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{cartId}")]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCart(string cartId)
        {
            var cartItems = await _context.CartItems
                .Include(ci => ci.Product)
                .Where(ci => ci.CartId == cartId)
                .ToListAsync();

            return Ok(cartItems);
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart([FromBody] CartItem cartItem)
        {
            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == cartItem.CartId && ci.ProductId == cartItem.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += cartItem.Quantity;
                _context.CartItems.Update(existingItem);
                await _context.SaveChangesAsync();
                return await GetCartItemById(existingItem.Id);
            }
            
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();
            return await GetCartItemById(cartItem.Id);
        }

        private async Task<ActionResult<CartItem>> GetCartItemById(int id)
        {
            var item = await _context.CartItems
                .Include(ci => ci.Product)
                .FirstOrDefaultAsync(ci => ci.Id == id);
            
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CartItem>> UpdateCartItem(int id, [FromBody] CartItem cartItem)
        {
            if (id != cartItem.Id)
                return BadRequest();

            var existingItem = await _context.CartItems.FindAsync(id);
            if (existingItem == null)
                return NotFound();

            existingItem.Quantity = cartItem.Quantity;
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.CartItems.AnyAsync(ci => ci.Id == id))
                    return NotFound();
                throw;
            }

            return await GetCartItemById(id);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            
            if (cartItem == null)
                return NotFound();

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
} 