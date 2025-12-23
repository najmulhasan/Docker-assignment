const express = require('express')
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController')
const { authMiddleware } = require('../middleware/auth')

const router = express.Router()

router.use(authMiddleware)

router.post('/', createOrder)
router.get('/', getUserOrders)
router.get('/:id', getOrderById)
router.put('/:id', updateOrderStatus)

module.exports = router
