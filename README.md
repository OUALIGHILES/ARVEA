# ARVEA E-commerce Platform

A modern, scalable Next.js e-commerce platform for selling premium skincare products directly from Instagram.

## Features

### 🛍️ E-commerce Core
- **Product Management**: Full CRUD operations for products
- **Shopping Cart**: Add, remove, update quantities with persistent storage
- **User Authentication**: JWT-based auth with role-based access control
- **Admin Dashboard**: Product management with statistics and inventory tracking

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Reusable UI components with shadcn/ui
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: Comprehensive error states and user feedback

### 🏗️ Architecture
- **Modular Structure**: Feature-based organization with clear separation of concerns
- **TypeScript**: Full type safety throughout the application
- **API Layer**: RESTful API routes with proper validation
- **Middleware**: Route protection and authentication middleware

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   ├── admin/          # Admin-specific components
│   └── cart/           # Cart-related components
├── modules/            # Feature-based modules
│   └── products/       # Product management module
│       ├── ui/         # Product UI components
│       ├── hooks/      # Product-related hooks
│       └── services/   # Product API services
├── contexts/           # React contexts (Auth, Cart)
├── lib/               # Utility functions and configurations
├── middleware/        # Authentication and route protection
└── types/             # TypeScript type definitions

app/
├── api/               # Next.js API routes
│   ├── auth/          # Authentication endpoints
│   ├── products/      # Product CRUD endpoints
│   └── cart/          # Cart management endpoints
├── dashboard/         # Admin dashboard pages
├── product/           # Product detail pages
└── cart/              # Shopping cart page
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd arvea-ecommerce
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Update the environment variables:
\`\`\`env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
INSTAGRAM_ACCESS_TOKEN="your-instagram-token"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Features

### Authentication System
- JWT-based authentication with HTTP-only cookies
- Role-based access control (admin/customer)
- Protected routes with middleware
- Login/register pages with validation

### Product Management
- CRUD operations for products
- Image upload support
- Stock management
- Category organization
- Instagram post integration

### Shopping Cart
- Add/remove products
- Quantity management
- Persistent cart storage
- Guest and authenticated user support

### Admin Dashboard
- Product management interface
- Inventory statistics
- User management
- Protected admin routes

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[itemId]` - Update cart item quantity
- `DELETE /api/cart/[itemId]` - Remove item from cart
- `POST /api/cart/clear` - Clear entire cart

## Technologies Used

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: JWT with HTTP-only cookies
- **State Management**: React Context API
- **Database**: Placeholder implementation (ready for Prisma/Supabase)
- **Validation**: Custom validation utilities

## Future Enhancements

### Database Integration
Replace mock data with actual database:
- Prisma ORM with PostgreSQL
- Supabase integration
- Real-time updates

### Payment Processing
- Stripe integration
- Checkout flow
- Order management

### Instagram Integration
- Automatic product sync from Instagram
- Social media authentication
- Instagram post embedding

### Advanced Features
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Analytics dashboard

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
