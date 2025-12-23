const { verifyToken } = require('../utils/jwt')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' })
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Internal server error'
  res.status(status).json({ message })
}

module.exports = { authMiddleware, errorHandler }
