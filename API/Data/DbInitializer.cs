using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.EnsureCreated();

            // Check if we already have categories
            if (context.Categories.Any())
                return;

            // Add Categories
            var categories = new Category[]
            {
                new Category { Name = "Electronics" },
                new Category { Name = "Clothing" },
                new Category { Name = "Books" },
                new Category { Name = "Home & Garden" }
            };

            context.Categories.AddRange(categories);
            context.SaveChanges();

            // Add Products
            var products = new Product[]
            {
                new Product
                {
                    Name = "Smartphone",
                    Description = "Latest model smartphone with advanced features",
                    Price = 699.99m,
                    ImageUrl = "https://via.placeholder.com/200",
                    CategoryId = categories[0].Id
                },
                new Product
                {
                    Name = "Laptop",
                    Description = "High-performance laptop for work and gaming",
                    Price = 1299.99m,
                    ImageUrl = "https://via.placeholder.com/200",
                    CategoryId = categories[0].Id
                },
                new Product
                {
                    Name = "T-Shirt",
                    Description = "Comfortable cotton t-shirt",
                    Price = 19.99m,
                    ImageUrl = "https://via.placeholder.com/200",
                    CategoryId = categories[1].Id
                },
                new Product
                {
                    Name = "Jeans",
                    Description = "Classic blue jeans",
                    Price = 49.99m,
                    ImageUrl = "https://via.placeholder.com/200",
                    CategoryId = categories[1].Id
                },
                new Product
                {
                    Name = "Novel",
                    Description = "Bestselling fiction novel",
                    Price = 14.99m,
                    ImageUrl = "https://via.placeholder.com/200",
                    CategoryId = categories[2].Id
                },
                new Product
                {
                    Name = "Cookbook",
                    Description = "Collection of gourmet recipes",
                    Price = 24.99m,
                    ImageUrl = "https://via.placeholder.com/200",
                    CategoryId = categories[2].Id
                },
                new Product
                {
                    Name = "Garden Tools Set",
                    Description = "Complete set of essential garden tools",
                    Price = 79.99m,
                    ImageUrl = "https://via.placeholder.com/200",
                    CategoryId = categories[3].Id
                },
                new Product
                {
                    Name = "Plant Pot",
                    Description = "Decorative ceramic plant pot",
                    Price = 29.99m,
                    ImageUrl = "https://via.placeholder.com/200",
                    CategoryId = categories[3].Id
                }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
} 