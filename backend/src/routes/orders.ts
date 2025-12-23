import express from 'express'
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

router.use(authMiddleware)

router.post('/', createOrder)
router.get('/', getUserOrders)
router.get('/:id', getOrderById)
router.put('/:id', updateOrderStatus)

export default router
