const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
  try {
    const { category, sort, limit = 10, page = 1 } = req.query

    let query = {}
    if (category) {
      query.category = category
    }

    let sortOption = { createdAt: -1 }
    if (sort === 'price-asc') {
      sortOption = { price: 1 }
    } else if (sort === 'price-desc') {
      sortOption = { price: -1 }
    }

    const skip = (Number(page) - 1) * Number(limit)

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(Number(limit))
      .skip(skip)

    const total = await Product.countDocuments(query)

    res.status(200).json({
      data: products,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        page: Number(page),
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    })

    await product.save()
    res.status(201).json({ message: 'Product created', product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ message: 'Product updated', product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
