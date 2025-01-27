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
                new Category { Name = "Home & Garden" },
                new Category { Name = "Sports & Outdoors" },
                new Category { Name = "Beauty & Health" },
                new Category { Name = "Toys & Games" },
                new Category { Name = "Automotive" }
            };

            context.Categories.AddRange(categories);
            context.SaveChanges();

            // Add Products
            var products = new Product[]
            {
                // Electronics
                new Product
                {
                    Name = "iPhone 15 Pro",
                    Description = "Latest Apple iPhone with A17 Pro chip, 48MP camera system, and titanium design. Available in Natural Titanium color.",
                    Price = 999.99m,
                    ImageUrl = "https://raw.githubusercontent.com/public-apis/public-apis/master/assets/iphone15.jpg",
                    CategoryId = categories[0].Id
                },
                new Product
                {
                    Name = "MacBook Air M2",
                    Description = "Supercharged by M2 chip, up to 18 hours of battery life, 13.6-inch Liquid Retina display, and MagSafe charging.",
                    Price = 1199.99m,
                    ImageUrl = "https://raw.githubusercontent.com/public-apis/public-apis/master/assets/macbook.jpg",
                    CategoryId = categories[0].Id
                },
                new Product
                {
                    Name = "Sony WH-1000XM5",
                    Description = "Industry-leading noise canceling headphones with Auto NC Optimizer, Crystal clear hands-free calling, and up to 30-hour battery life.",
                    Price = 399.99m,
                    ImageUrl = "https://raw.githubusercontent.com/public-apis/public-apis/master/assets/headphones.jpg",
                    CategoryId = categories[0].Id
                },

                // Clothing
                new Product
                {
                    Name = "Nike Dri-FIT Running Shirt",
                    Description = "Lightweight, breathable running shirt with sweat-wicking technology. Perfect for your daily workouts.",
                    Price = 29.99m,
                    ImageUrl = "https://picsum.photos/seed/shirt/300/300",
                    CategoryId = categories[1].Id
                },
                new Product
                {
                    Name = "Levi's 501 Original Fit Jeans",
                    Description = "The original blue jean since 1873. Straight leg, button fly, sits at waist. 100% cotton denim.",
                    Price = 69.99m,
                    ImageUrl = "https://picsum.photos/seed/jeans/300/300",
                    CategoryId = categories[1].Id
                },
                new Product
                {
                    Name = "The North Face Thermoball Eco Jacket",
                    Description = "Lightweight, warm synthetic insulation jacket made with recycled materials. Perfect for cold weather.",
                    Price = 199.99m,
                    ImageUrl = "https://picsum.photos/seed/jacket/300/300",
                    CategoryId = categories[1].Id
                },

                // Books
                new Product
                {
                    Name = "Atomic Habits",
                    Description = "James Clear's comprehensive guide to breaking bad habits and forming good ones. #1 New York Times bestseller.",
                    Price = 24.99m,
                    ImageUrl = "https://picsum.photos/seed/book1/300/300",
                    CategoryId = categories[2].Id
                },
                new Product
                {
                    Name = "The Hunger Games Box Set",
                    Description = "Complete collection of Suzanne Collins' groundbreaking series. Includes all three books in a stunning box set.",
                    Price = 49.99m,
                    ImageUrl = "https://picsum.photos/seed/book2/300/300",
                    CategoryId = categories[2].Id
                },

                // Home & Garden
                new Product
                {
                    Name = "Dyson V15 Detect",
                    Description = "Cordless vacuum with laser dust detection, HEPA filtration, and up to 60 minutes of fade-free power.",
                    Price = 699.99m,
                    ImageUrl = "https://picsum.photos/seed/vacuum/300/300",
                    CategoryId = categories[3].Id
                },
                new Product
                {
                    Name = "KitchenAid Stand Mixer",
                    Description = "Professional 5-quart stand mixer in Empire Red. 10 speeds, includes flat beater, dough hook, and wire whip.",
                    Price = 399.99m,
                    ImageUrl = "https://picsum.photos/seed/mixer/300/300",
                    CategoryId = categories[3].Id
                },

                // Sports & Outdoors
                new Product
                {
                    Name = "Yeti Tundra 45 Cooler",
                    Description = "Premium hard cooler that keeps ice for days. Perfect for camping, fishing, or tailgating.",
                    Price = 299.99m,
                    ImageUrl = "https://picsum.photos/seed/cooler/300/300",
                    CategoryId = categories[4].Id
                },
                new Product
                {
                    Name = "Trek Marlin 7 Mountain Bike",
                    Description = "Trail-tough mountain bike with RockShox fork, Shimano drivetrain, and hydraulic disc brakes.",
                    Price = 999.99m,
                    ImageUrl = "https://picsum.photos/seed/bike/300/300",
                    CategoryId = categories[4].Id
                },

                // Beauty & Health
                new Product
                {
                    Name = "Dyson Airwrap Complete",
                    Description = "Multi-styling tool for multiple hair types. Includes 6 attachments for curling, smoothing, and drying.",
                    Price = 599.99m,
                    ImageUrl = "https://picsum.photos/seed/hairdryer/300/300",
                    CategoryId = categories[5].Id
                },
                new Product
                {
                    Name = "La Mer Moisturizing Cream",
                    Description = "Luxury moisturizer with Miracle Broth™. Helps heal dryness, reduce fine lines, and restore radiance.",
                    Price = 199.99m,
                    ImageUrl = "https://picsum.photos/seed/cream/300/300",
                    CategoryId = categories[5].Id
                },

                // Toys & Games
                new Product
                {
                    Name = "LEGO Star Wars Millennium Falcon",
                    Description = "Ultimate Collector Series set with 7,541 pieces. Includes minifigures and detailed interior.",
                    Price = 799.99m,
                    ImageUrl = "https://picsum.photos/seed/lego/300/300",
                    CategoryId = categories[6].Id
                },
                new Product
                {
                    Name = "PlayStation 5",
                    Description = "Next-gen gaming console with 4K graphics, ray tracing, and ultra-high speed SSD. Digital Edition.",
                    Price = 499.99m,
                    ImageUrl = "https://picsum.photos/seed/ps5/300/300",
                    CategoryId = categories[6].Id
                },

                // Automotive
                new Product
                {
                    Name = "NOCO Boost Plus GB40",
                    Description = "1000 Amp 12-volt UltraSafe lithium jump starter for up to 6-liter gas and 3-liter diesel engines.",
                    Price = 99.99m,
                    ImageUrl = "https://picsum.photos/seed/jumpstarter/300/300",
                    CategoryId = categories[7].Id
                },
                new Product
                {
                    Name = "Chemical Guys Car Care Kit",
                    Description = "14-piece car wash kit with soap, wax, brushes, and microfiber towels. Everything for a showroom shine.",
                    Price = 149.99m,
                    ImageUrl = "https://picsum.photos/seed/carcare/300/300",
                    CategoryId = categories[7].Id
                }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
} 