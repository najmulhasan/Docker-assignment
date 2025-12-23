'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
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
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Checkout
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Welcome to ShopHub
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices. Built with modern technology
          for the best shopping experience.
        </p>
        <Link
          href="/products"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
        >
          Start Shopping
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Fast Delivery',
                description: 'Get your orders delivered quickly to your doorstep',
              },
              {
                title: 'Secure Payment',
                description: 'Safe and encrypted payment processing',
              },
              {
                title: '24/7 Support',
                description: 'Customer support available round the clock',
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
