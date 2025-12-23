const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/orders')
const { errorHandler } = require('./middleware/auth')

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
app.get('/api/health', (req, res) => {
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
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app
