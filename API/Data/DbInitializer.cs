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
                    ImageUrl = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg",
                    CategoryId = categories[0].Id
                },
                new Product
                {
                    Name = "MacBook Air M2",
                    Description = "Supercharged by M2 chip, up to 18 hours of battery life, 13.6-inch Liquid Retina display, and MagSafe charging.",
                    Price = 1199.99m,
                    ImageUrl = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg",
                    CategoryId = categories[0].Id
                },
                new Product
                {
                    Name = "Sony WH-1000XM5",
                    Description = "Industry-leading noise canceling headphones with Auto NC Optimizer, Crystal clear hands-free calling, and up to 30-hour battery life.",
                    Price = 399.99m,
                    ImageUrl = "https://electronics.sony.com/image/5d02da5c0a04c5ed9d16e't3a/1000",
                    CategoryId = categories[0].Id
                },

                // Clothing
                new Product
                {
                    Name = "Nike Dri-FIT Running Shirt",
                    Description = "Lightweight, breathable running shirt with sweat-wicking technology. Perfect for your daily workouts.",
                    Price = 29.99m,
                    ImageUrl = "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7a717540-b712-486c-8542-d8926b9f4b21/dri-fit-mens-running-t-shirt-PCJXQ2.png",
                    CategoryId = categories[1].Id
                },
                new Product
                {
                    Name = "Levi's 501 Original Fit Jeans",
                    Description = "The original blue jean since 1873. Straight leg, button fly, sits at waist. 100% cotton denim.",
                    Price = 69.99m,
                    ImageUrl = "https://lsco.scene7.com/is/image/lsco/005010114-front-pdp?fmt=jpeg&qlt=70",
                    CategoryId = categories[1].Id
                },
                new Product
                {
                    Name = "The North Face Thermoball Eco Jacket",
                    Description = "Lightweight, warm synthetic insulation jacket made with recycled materials. Perfect for cold weather.",
                    Price = 199.99m,
                    ImageUrl = "https://images.thenorthface.com/is/image/TheNorthFace/NF0A3Y3M_JK3_hero",
                    CategoryId = categories[1].Id
                },

                // Books
                new Product
                {
                    Name = "Atomic Habits",
                    Description = "James Clear's comprehensive guide to breaking bad habits and forming good ones. #1 New York Times bestseller.",
                    Price = 24.99m,
                    ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
                    CategoryId = categories[2].Id
                },
                new Product
                {
                    Name = "The Hunger Games Box Set",
                    Description = "Complete collection of Suzanne Collins' groundbreaking series. Includes all three books in a stunning box set.",
                    Price = 49.99m,
                    ImageUrl = "https://images-na.ssl-images-amazon.com/images/I/71XvN4sOflL.jpg",
                    CategoryId = categories[2].Id
                },

                // Home & Garden
                new Product
                {
                    Name = "Dyson V15 Detect",
                    Description = "Cordless vacuum with laser dust detection, HEPA filtration, and up to 60 minutes of fade-free power.",
                    Price = 699.99m,
                    ImageUrl = "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/368673-01.png",
                    CategoryId = categories[3].Id
                },
                new Product
                {
                    Name = "KitchenAid Stand Mixer",
                    Description = "Professional 5-quart stand mixer in Empire Red. 10 speeds, includes flat beater, dough hook, and wire whip.",
                    Price = 399.99m,
                    ImageUrl = "https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/kitchenaid/en-us/digital-assets/pages/countertop-appliances/stand-mixers/professional-5-plus-5-quart-bowl-lift-stand-mixer-KV25G0X/images/hero-KV25G0XER.png",
                    CategoryId = categories[3].Id
                },

                // Sports & Outdoors
                new Product
                {
                    Name = "Yeti Tundra 45 Cooler",
                    Description = "Premium hard cooler that keeps ice for days. Perfect for camping, fishing, or tailgating.",
                    Price = 299.99m,
                    ImageUrl = "https://yeti-web.imgix.net/300/YETI-Tundra-45-White-Front.jpg",
                    CategoryId = categories[4].Id
                },
                new Product
                {
                    Name = "Trek Marlin 7 Mountain Bike",
                    Description = "Trail-tough mountain bike with RockShox fork, Shimano drivetrain, and hydraulic disc brakes.",
                    Price = 999.99m,
                    ImageUrl = "https://trek.scene7.com/is/image/TrekBicycleProducts/Marlin7_22_35066_A_Portrait",
                    CategoryId = categories[4].Id
                },

                // Beauty & Health
                new Product
                {
                    Name = "Dyson Airwrap Complete",
                    Description = "Multi-styling tool for multiple hair types. Includes 6 attachments for curling, smoothing, and drying.",
                    Price = 599.99m,
                    ImageUrl = "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/435187-01.png",
                    CategoryId = categories[5].Id
                },
                new Product
                {
                    Name = "La Mer Moisturizing Cream",
                    Description = "Luxury moisturizer with Miracle Broth™. Helps heal dryness, reduce fine lines, and restore radiance.",
                    Price = 199.99m,
                    ImageUrl = "https://www.cremedelamer.com/media/export/cms/products/680x680/lm_sku_SRNX01_680x680_0.png",
                    CategoryId = categories[5].Id
                },

                // Toys & Games
                new Product
                {
                    Name = "LEGO Star Wars Millennium Falcon",
                    Description = "Ultimate Collector Series set with 7,541 pieces. Includes minifigures and detailed interior.",
                    Price = 799.99m,
                    ImageUrl = "https://www.lego.com/cdn/cs/set/assets/blt3e446b6889283199/75192.jpg",
                    CategoryId = categories[6].Id
                },
                new Product
                {
                    Name = "PlayStation 5",
                    Description = "Next-gen gaming console with 4K graphics, ray tracing, and ultra-high speed SSD. Digital Edition.",
                    Price = 499.99m,
                    ImageUrl = "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21",
                    CategoryId = categories[6].Id
                },

                // Automotive
                new Product
                {
                    Name = "NOCO Boost Plus GB40",
                    Description = "1000 Amp 12-volt UltraSafe lithium jump starter for up to 6-liter gas and 3-liter diesel engines.",
                    Price = 99.99m,
                    ImageUrl = "https://m.media-amazon.com/images/I/71Jh6XnvHQL._AC_SL1500_.jpg",
                    CategoryId = categories[7].Id
                },
                new Product
                {
                    Name = "Chemical Guys Car Care Kit",
                    Description = "14-piece car wash kit with soap, wax, brushes, and microfiber towels. Everything for a showroom shine.",
                    Price = 149.99m,
                    ImageUrl = "https://m.media-amazon.com/images/I/91jYxcGbqLL._AC_SL1500_.jpg",
                    CategoryId = categories[7].Id
                }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
} 