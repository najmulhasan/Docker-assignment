const Cart = require('../models/Cart')
const Product = require('../models/Product')

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate(
      'items.productId'
    )

    if (!cart) {
      return res.status(200).json({ items: [], total: 0 })
    }

    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    let cart = await Cart.findOne({ userId: req.userId })

    if (!cart) {
      cart = new Cart({
        userId: req.userId,
        items: [{ productId, quantity, price: product.price }],
        total: product.price * quantity,
      })
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.items.push({ productId, quantity, price: product.price })
      }

      cart.total = cart.items.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
      )
    }

    await cart.save()
    res.status(200).json({ message: 'Item added to cart', cart })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params

    const cart = await Cart.findOne({ userId: req.userId })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    )
    cart.total = cart.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    )

    await cart.save()
    res.status(200).json({ message: 'Item removed from cart', cart })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params
    const { quantity } = req.body

    const cart = await Cart.findOne({ userId: req.userId })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    )
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' })
    }

    item.quantity = quantity
    cart.total = cart.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    )

    await cart.save()
    res.status(200).json({ message: 'Cart updated', cart })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    cart.items = []
    cart.total = 0
    await cart.save()

    res.status(200).json({ message: 'Cart cleared' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
}
