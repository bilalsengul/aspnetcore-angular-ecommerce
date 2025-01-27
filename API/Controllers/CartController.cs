using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly ApplicationDbContext _context;
        private const decimal VAT_RATE = 0.20m; // 20% VAT

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{cartId}")]
        public async Task<ActionResult<object>> GetCart(string cartId)
        {
            var cartItems = await _context.CartItems
                .Include(ci => ci.Product)
                .Where(ci => ci.CartId == cartId)
                .ToListAsync();

            var subtotal = cartItems.Sum(item => item.Product.Price * item.Quantity);
            var vat = subtotal * VAT_RATE;
            var total = subtotal + vat;

            return Ok(new
            {
                Items = cartItems,
                Subtotal = subtotal,
                VAT = vat,
                Total = total,
                ItemCount = cartItems.Sum(item => item.Quantity)
            });
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart([FromBody] AddToCartRequest request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound("Product not found");

            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == request.CartId && ci.ProductId == request.ProductId);

            if (cartItem == null)
            {
                cartItem = new CartItem
                {
                    CartId = request.CartId,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity
                };
                _context.CartItems.Add(cartItem);
            }
            else
            {
                cartItem.Quantity += request.Quantity;
            }

            await _context.SaveChangesAsync();
            return Ok(cartItem);
        }

        [HttpPut("{cartId}/items/{productId}")]
        public async Task<ActionResult> UpdateQuantity(string cartId, int productId, int quantity)
        {
            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == cartId && ci.ProductId == productId);

            if (cartItem == null)
                return NotFound();

            if (quantity <= 0)
            {
                _context.CartItems.Remove(cartItem);
            }
            else
            {
                cartItem.Quantity = quantity;
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{cartId}/items/{productId}")]
        public async Task<ActionResult> RemoveFromCart(string cartId, int productId)
        {
            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartId == cartId && ci.ProductId == productId);

            if (cartItem == null)
                return NotFound();

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
} 