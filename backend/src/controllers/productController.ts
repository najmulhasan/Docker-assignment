import { Request, Response } from 'express'
import Product from '../models/Product'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, sort, limit = 10, page = 1 } = req.query

    let query: any = {}
    if (category) {
      query.category = category
    }

    let sortOption: any = { createdAt: -1 }
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
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ message: 'Product updated', product })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ message: 'Product deleted' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
