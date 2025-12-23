import jwt from 'jsonwebtoken'

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_secret', {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your_secret')
  } catch (error) {
    return null
  }
}
