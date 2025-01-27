using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using Microsoft.Extensions.Caching.Memory;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _cache;
        private const string ProductsCacheKey = "ProductsList";

        public ProductsController(ApplicationDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? categoryId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                IQueryable<Product> products = _context.Products
                    .Include(p => p.Category)
                    .OrderBy(p => p.Id); // Add consistent ordering

                // Apply filters
                if (minPrice.HasValue)
                    products = products.Where(p => p.Price >= minPrice.Value);

                if (maxPrice.HasValue)
                    products = products.Where(p => p.Price <= maxPrice.Value);

                if (categoryId.HasValue)
                    products = products.Where(p => p.CategoryId == categoryId.Value);

                // Apply pagination
                var totalItems = await products.CountAsync();
                var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

                var pagedProducts = await products
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                Response.Headers["X-Total-Count"] = totalItems.ToString();
                Response.Headers["X-Total-Pages"] = totalPages.ToString();

                return Ok(pagedProducts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetProductCount(
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? categoryId)
        {
            try
            {
                IQueryable<Product> products = _context.Products;

                // Apply filters
                if (minPrice.HasValue)
                    products = products.Where(p => p.Price >= minPrice.Value);

                if (maxPrice.HasValue)
                    products = products.Where(p => p.Price <= maxPrice.Value);

                if (categoryId.HasValue)
                    products = products.Where(p => p.CategoryId == categoryId.Value);

                return await products.CountAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // Additional endpoints can be added here for CRUD operations
    }
} 