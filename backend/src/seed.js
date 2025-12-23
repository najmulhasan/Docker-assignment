require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const MONGODB_URI = process.env.MONGODB_URI

const sampleProducts = [
  {
    name: 'Minimal Leather Wallet',
    description: 'Handcrafted slim wallet made from premium leather.',
    price: 39.99,
    category: 'accessories',
    image: 'https://via.placeholder.com/400x300?text=Wallet',
    stock: 120,
  },
  {
    name: 'Classic White Sneakers',
    description: 'Comfortable everyday sneakers with rubber sole.',
    price: 79.99,
    category: 'footwear',
    image: 'https://via.placeholder.com/400x300?text=Sneakers',
    stock: 60,
  },
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear wireless headphones.',
    price: 149.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/400x300?text=Headphones',
    stock: 40,
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Soft organic cotton t-shirt available in several colors.',
    price: 24.99,
    category: 'clothing',
    image: 'https://via.placeholder.com/400x300?text=T-Shirt',
    stock: 200,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated bottle keeps drinks cold for 24 hours.',
    price: 29.99,
    category: 'home',
    image: 'https://via.placeholder.com/400x300?text=Bottle',
    stock: 150,
  },
]

async function seed() {
  try {
    console.log('Connecting to database...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing products
    await Product.deleteMany({})
    console.log('Cleared existing products')

    const inserted = await Product.insertMany(sampleProducts)
    console.log(`Inserted ${inserted.length} products`)

    await mongoose.disconnect()
    console.log('Disconnected. Seed complete.')
    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()
