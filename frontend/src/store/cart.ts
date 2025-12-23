import { create } from 'zustand'
import { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  total: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  calculateTotal: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i._id === item._id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...item, quantity: 1 }] }
    }),
  
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i._id !== id),
    })),
  
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i._id === id ? { ...i, quantity } : i
      ),
    })),
  
  clearCart: () => set({ items: [], total: 0 }),
  
  calculateTotal: () =>
    set((state) => ({
      total: state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    })),
}))
