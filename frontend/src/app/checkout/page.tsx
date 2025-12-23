'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useMemo, useState } from 'react'

export default function CheckoutPage() {
  const { items, total } = useCartStore((s) => ({ items: s.items, total: s.total }))
  const [payment, setPayment] = useState<'card' | 'cod'>('card')

  const computedTotal = useMemo(
    () => (total ? total : items.reduce((sum, i) => sum + i.price * i.quantity, 0)),
    [items, total]
  )

  const handlePay = () => {
    alert('Demo payment processed successfully!')
  }

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
            <Link href="/cart" className="hover:text-primary transition">
              Cart
            </Link>
            <Link
              href="/checkout"
              className="font-semibold text-primary"
            >
              Checkout
            </Link>
          </div>
        </div>
      </nav>

      <main className="container py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout (Demo)</h1>

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
            <section className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method (Demo)</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === 'card'}
                      onChange={() => setPayment('card')}
                    />
                    <span>Card (simulated)</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === 'cod'}
                      onChange={() => setPayment('cod')}
                    />
                    <span>Cash on delivery (simulated)</span>
                  </label>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between text-sm text-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-500">
                            Qty {item.quantity} · ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="flex items-center justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>${computedTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 mb-4">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>${computedTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePay}
                className="w-full bg-primary text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Pay now (demo)
              </button>
              <p className="text-xs text-gray-500 mt-3">
                This is a simulated checkout for demonstration only.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}

