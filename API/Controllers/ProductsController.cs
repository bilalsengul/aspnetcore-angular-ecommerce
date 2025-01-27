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
            if (!_cache.TryGetValue(ProductsCacheKey, out IQueryable<Product> products))
            {
                products = _context.Products
                    .Include(p => p.Category);

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(10));

                _cache.Set(ProductsCacheKey, products, cacheEntryOptions);
            }

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

            Response.Headers.Add("X-Total-Count", totalItems.ToString());
            Response.Headers.Add("X-Total-Pages", totalPages.ToString());

            return Ok(pagedProducts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            return product;
        }

        // Additional endpoints can be added here for CRUD operations
    }
} 