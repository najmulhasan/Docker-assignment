# Backend - E-Commerce Platform

Express.js-based scalable backend API with MongoDB integration, JWT authentication, and RESTful endpoints.

## Features

- RESTful API with Express.js
- MongoDB database integration
- JWT-based authentication
- User management and roles
- Product management
- Order processing
- Shopping cart management
- Input validation with Joi

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the backend root:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d
NODE_ENV=development
```

### Running the Development Server

```bash
npm run dev
```

The API will be available at [http://localhost:5000](http://localhost:5000)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── models/         # MongoDB schemas
├── routes/         # API routes
├── controllers/    # Route handlers
├── middleware/     # Custom middleware
├── utils/          # Utility functions
├── types/          # TypeScript interfaces
└── index.ts        # Application entry point
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

## Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Joi
- **Language**: TypeScript
