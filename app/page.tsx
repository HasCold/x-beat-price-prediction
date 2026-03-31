'use client'

import { Header } from '@/components/header'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Truck, Shield } from 'lucide-react'

// Mock data - will be replaced with API calls in the backend
const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Ultra HD 4K Monitor',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Professional Camera Bag',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Mechanical Gaming Keyboard',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1587829191301-6d53e0a1f3f3?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    id: '5',
    name: 'Portable Power Bank 20000mAh',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Ergonomic Desk Chair',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1579658291049-0b46292eadaa?w=500&h=500&fit=crop',
    category: 'Furniture',
  },
  {
    id: '7',
    name: 'USB-C Hub Pro',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    category: 'Accessories',
  },
  {
    id: '8',
    name: '27" IPS LED Monitor',
    price: 279.99,
    image: 'https://images.unsplash.com/photo-1586253408844-8bb9e1f5a5e0?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Discover Amazing Products
            </h1>
            <p className="mt-4 text-balance text-lg text-muted-foreground">
              Shop the latest electronics, accessories, and more. Premium quality at unbeatable prices.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop Now
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Truck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  On orders over $50. Fast and reliable delivery.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Checkout</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your payment information is always protected.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  All products are carefully selected and tested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-12">
            <h2 className="text-balance text-3xl font-bold">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">
              Handpicked selection of our best-selling items
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Join Our Newsletter</h2>
            <p className="mt-2 text-muted-foreground">
              Get exclusive deals and updates delivered to your inbox.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded border border-border bg-background px-4 py-2 text-sm placeholder-muted-foreground focus:border-accent focus:outline-none"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Help Center</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-foreground">Track Order</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Twitter</Link></li>
                <li><Link href="#" className="hover:text-foreground">Instagram</Link></li>
                <li><Link href="#" className="hover:text-foreground">Facebook</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
