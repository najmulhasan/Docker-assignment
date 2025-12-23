'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, calculateTotal } = useCartStore((s) => ({
    items: s.items,
    total: s.total,
    updateQuantity: s.updateQuantity,
    removeItem: s.removeItem,
    calculateTotal: s.calculateTotal,
  }))

  // Keep total in sync on changes
  useEffect(() => {
    calculateTotal()
  }, [items, calculateTotal])

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            ShopHub
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/products" className="hover:text-primary transition">
              Products
            </Link>
            <Link href="/cart" className="font-semibold text-primary">
              Cart
            </Link>
            <Link
              href="/checkout"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Checkout
            </Link>
          </div>
        </div>
      </nav>

      <main className="container py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link
              href="/products"
              className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex gap-4"
                >
                  <div className="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-primary font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-700">Qty</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, Math.max(1, Number(e.target.value)))
                        }
                        className="w-20 rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary"
                      />
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex items-center justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 mb-4">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="block text-center bg-primary text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}

