import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'E-Commerce Platform',
  description: 'Modern scalable e-commerce platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <footer className="bg-slate-900 text-slate-100">
            <div className="container py-10 grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <p className="text-xl font-semibold">ShopHub</p>
                <p className="text-sm text-slate-300">
                  Modern e-commerce demo built with Next.js, showing products, cart, and checkout flows.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-3">Explore</p>
                <div className="flex flex-col gap-2 text-sm text-slate-200">
                  <Link href="/products" className="hover:text-white">
                    Products
                  </Link>
                  <Link href="/cart" className="hover:text-white">
                    Cart
                  </Link>
                  <Link href="/checkout" className="hover:text-white">
                    Checkout
                  </Link>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-3">Support</p>
                <div className="text-sm text-slate-300 space-y-1">
                  <p>Email: support@shophub.demo</p>
                  <p>Hours: 24/7 (demo)</p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-800">
              <div className="container py-4 text-xs text-slate-400 flex items-center justify-between">
                <span>© {new Date().getFullYear()} ShopHub Demo</span>
                <span>Secure payments · Fast delivery · Support</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
