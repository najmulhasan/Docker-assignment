export interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  createdAt: string
  updatedAt: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  _id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface Order {
  _id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
  updatedAt: string
}
