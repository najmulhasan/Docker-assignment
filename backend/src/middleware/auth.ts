import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = verifyToken(token) as any
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' })
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Internal server error'
  res.status(status).json({ message })
}
