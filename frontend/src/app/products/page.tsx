'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { Product } from '@/types'

const demoProducts: Product[] = [
  {
    _id: 'p1',
    name: 'Wireless Headphones',
    description: 'Noise cancelling, 30h battery, fast charge.',
    price: 129.99,
    image:
      'https://images.unsplash.com/photo-1518443895912-7c1ad6f5c3da?auto=format&fit=crop&w=600&q=80',
    category: 'Audio',
    stock: 25,
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: 'p2',
    name: 'Smart Watch',
    description: 'Heart-rate, GPS, sleep tracking, 7-day battery.',
    price: 189.0,
    image:
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=600&q=80',
    category: 'Wearables',
    stock: 30,
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: 'p3',
    name: 'Ultrabook 14”',
    description: 'Lightweight, 16GB RAM, 512GB SSD, all-day battery.',
    price: 999.99,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    category: 'Laptops',
    stock: 12,
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: 'p4',
    name: '4K Action Camera',
    description: 'Stabilization, waterproof, 4K60, Wi-Fi transfer.',
    price: 249.99,
    image:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
    category: 'Cameras',
    stock: 18,
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: 'p5',
    name: 'Ergonomic Office Chair',
    description: 'Lumbar support, breathable mesh, adjustable height.',
    price: 219.5,
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    category: 'Office',
    stock: 40,
    createdAt: '',
    updatedAt: '',
  },
]

export default function ProductsPage() {
  const addItem = useCartStore((s) => s.addItem)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(demoProducts.map((p) => p.category)))],
    []
  )

  const filtered = useMemo(() => {
    return demoProducts.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || p.category === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            ShopHub
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/products" className="font-semibold text-primary">
              Products
            </Link>
            <Link href="/cart" className="hover:text-primary transition">
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

      <header className="container py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">
              Demo catalog with search, filtering, and add-to-cart.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full md:w-72 rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="container pb-16">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            No products found. Try a different search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <span className="text-primary font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-xs px-2 py-1 rounded bg-blue-50 text-primary">
                      {product.category}
                    </span>
                    <button
                      onClick={() =>
                        addItem({ ...product, quantity: 1 })
                      }
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

