# E-Commerce Platform

A modern, scalable e-commerce platform built with Next.js (frontend), Node.js/Express (backend), and MongoDB (database).

## Project Structure

```
e-commerce/
├── frontend/          # Next.js 14 frontend application
│   ├── src/
│   │   ├── app/      # Next.js app directory
│   │   ├── components/
│   │   ├── store/    # Zustand state management
│   │   ├── lib/      # Utilities and API client
│   │   └── types/    # TypeScript types
│   ├── package.json
│   └── README.md
├── backend/           # Express.js API server
│   ├── src/
│   │   ├── models/   # MongoDB schemas
│   │   ├── routes/   # API routes
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── index.ts
│   ├── package.json
│   └── README.md
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Setup Backend

```bash
cd backend
npm install
# Configure .env file
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`

### Setup Frontend

```bash
cd frontend
npm install
# Configure .env.local file
cp .env.example .env.local
npm run dev
```

Frontend runs on `http://localhost:3000`

## Key Features

### Frontend (Next.js)
- Server-side rendering and static generation
- Responsive design with Tailwind CSS
- State management with Zustand
- API integration with Axios
- Authentication & protected routes
- Shopping cart functionality
- Product filtering and search

### Backend (Express.js)
- RESTful API design
- JWT-based authentication
- MongoDB integration with Mongoose
- CORS support
- Input validation
- Error handling
- Scalable controller/route structure

### Database (MongoDB)
- User management
- Product catalog
- Shopping cart
- Order management

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add to cart
- `PUT /api/cart/items/:productId` - Update quantity
- `DELETE /api/cart/items/:productId` - Remove item
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

## Environment Configuration

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
NODE_ENV=development
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Technologies Used

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

## Development

### Build Frontend
```bash
cd frontend
npm run build
npm start
```

### Build Backend
```bash
cd backend
npm run build
npm start
```

## Testing

To test the API, you can use Postman or create `.http` files with the REST client extension.

## Scalability Features

- **Modular architecture** - Easy to extend and maintain
- **Separation of concerns** - Controllers, models, and routes separated
- **State management** - Zustand for lightweight global state
- **Error handling** - Centralized error middleware
- **JWT authentication** - Stateless, scalable auth
- **Database indexing** - Ready for MongoDB optimization
- **CORS support** - Ready for multi-domain deployment

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Email notifications
- Admin dashboard
- Product reviews and ratings
- Search and recommendation engine
- Image upload and CDN integration
- Analytics and reporting
- Mobile app with React Native

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.
