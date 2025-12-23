import { Request, Response } from 'express'
import Order from '../models/Order'
import Cart from '../models/Cart'

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { shippingAddress, paymentMethod } = req.body

    const cart = await Cart.findOne({ userId: req.userId })
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const order = new Order({
      userId: req.userId,
      items: cart.items,
      total: cart.total,
      shippingAddress,
      paymentMethod,
      status: 'pending',
    })

    await order.save()
    await Cart.deleteOne({ userId: req.userId })

    res.status(201).json({ message: 'Order created successfully', order })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    })

    res.status(200).json(orders)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    if (order.userId.toString() !== req.userId && req.userId !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    res.status(200).json(order)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json({ message: 'Order updated', order })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
