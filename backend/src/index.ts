import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import cartRoutes from './routes/cart'
import orderRoutes from './routes/orders'
import { errorHandler } from './middleware/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce'

// Middleware
app.use(cors())
app.use(express.json())

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

// Error Handler
app.use(errorHandler)

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

// Fallback error handler type safety
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next(err)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app
