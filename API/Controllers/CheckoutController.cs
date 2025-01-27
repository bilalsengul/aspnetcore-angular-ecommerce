using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using System.Threading.Tasks;
using System.Linq;

namespace API.Controllers
{
    public class CheckoutController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public CheckoutController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> Checkout([FromBody] CheckoutRequest request)
        {
            // Get cart items
            var cartItems = await _context.CartItems
                .Include(ci => ci.Product)
                .Where(ci => ci.CartId == request.CartId)
                .ToListAsync();

            if (!cartItems.Any())
            {
                return BadRequest("Cart is empty");
            }

            // Create order
            var order = new Order
            {
                CartId = request.CartId,
                CustomerEmail = request.CustomerEmail,
                ShippingAddress = request.ShippingAddress,
                TotalAmount = cartItems.Sum(ci => ci.Product.Price * ci.Quantity)
            };

            // Add order items
            foreach (var item in cartItems)
            {
                order.OrderItems.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.Product.Price
                });
            }

            _context.Orders.Add(order);

            // Clear cart
            _context.CartItems.RemoveRange(cartItems);
            
            await _context.SaveChangesAsync();

            // Return receipt
            return Ok(new
            {
                OrderNumber = order.OrderNumber,
                OrderDate = order.OrderDate,
                CustomerEmail = order.CustomerEmail,
                ShippingAddress = order.ShippingAddress,
                Items = order.OrderItems.Select(item => new
                {
                    ProductName = item.Product.Name,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    Subtotal = item.Subtotal
                }),
                TotalAmount = order.TotalAmount,
                Message = "Thank you for your purchase!"
            });
        }
    }
} 