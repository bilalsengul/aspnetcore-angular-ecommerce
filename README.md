# ASP.NET Core & Angular E-Commerce Project

A modern, full-stack e-commerce application built with ASP.NET Core 8 and Angular 17. This project demonstrates best practices in building scalable web applications with a focus on performance, security, and user experience.

## Features

- **Product Management**
  - Product listing with pagination
  - Category filtering
  - Price range filtering
  - Product details view
  - Product image handling

- **Shopping Cart**
  - Add/remove products
  - Update quantities
  - Persistent cart across sessions
  - Real-time price calculations
  - VAT calculations

- **Checkout Process**
  - Shipping information collection
  - Order summary
  - Order confirmation

- **Modern UI/UX**
  - Responsive design
  - Bootstrap 5 styling
  - Loading states
  - Error handling
  - Toast notifications

## Technology Stack

### Backend
- ASP.NET Core 8
- Entity Framework Core
- SQL Server
- RESTful API architecture
- Repository pattern
- CQRS pattern
- In-memory caching

### Frontend
- Angular 17
- TypeScript
- RxJS
- Bootstrap 5
- Angular Router
- Reactive Forms
- HTTP Interceptors

## Prerequisites

- .NET 8 SDK
- Node.js (v18 or later)
- SQL Server
- Angular CLI

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd aspnetcore-angular-ecommerce
   ```

2. **Set up the backend**
   ```bash
   cd API
   dotnet restore
   dotnet ef database update
   dotnet run
   ```

3. **Set up the frontend**
   ```bash
   cd client
   npm install
   ng serve
   ```

4. **Access the application**
   - API: http://localhost:5000
   - Frontend: http://localhost:4200

## Project Structure

```
├── API/                    # Backend API project
│   ├── Controllers/        # API endpoints
│   ├── Data/              # Database context and migrations
│   ├── Models/            # Domain models
│   └── Services/          # Business logic
│
└── client/                # Angular frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/  # Angular components
    │   │   ├── services/    # Angular services
    │   │   └── models/      # TypeScript interfaces
    │   └── environments/    # Environment configurations
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/categories` - Get all categories

### Cart
- `GET /api/cart/{cartId}` - Get cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout

## Development

### Backend Development
- Use Visual Studio 2022 or VS Code
- Run `dotnet watch run` for hot reload
- Use `dotnet ef migrations add [Name]` for new migrations

### Frontend Development
- Use VS Code with recommended extensions
- Run `ng serve` for development server
- Run `ng build` for production build
- Run `ng test` for unit tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap for the UI components
- Angular team for the excellent framework
- Microsoft for ASP.NET Core
- The open-source community 