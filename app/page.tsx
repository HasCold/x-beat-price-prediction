'use client'

import { Header } from '@/components/header'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { shophubGetProducts } from '@/lib/api'
import { listItemToCardProps } from '@/lib/shophub-mappers'
import Link from 'next/link'
import { Sparkles, Truck, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [totalCatalog, setTotalCatalog] = useState<number | null>(null)
  const [products, setProducts] = useState<ReturnType<typeof listItemToCardProps>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    shophubGetProducts({ page: 1, limit: 24 })
      .then((res) => {
        if (cancelled) return
        setProducts(res.data.map(listItemToCardProps))
        setTotalCatalog(res.pagination?.total ?? res.data.length)
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message || 'Failed to load products')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

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

      {/* Catalog preview */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-12">
            <h2 className="text-balance text-3xl font-bold">All Products</h2>
            <p className="mt-2 text-muted-foreground">
              {loading && 'Loading catalog…'}
              {!loading && error && (
                <>
                  Could not load products ({error}). Start the API on port 5000 or set{' '}
                  <code className="text-xs">NEXT_PUBLIC_API_URL</code>.
                </>
              )}
              {!loading && !error && totalCatalog != null && (
                <>
                  Browse our full catalog of {totalCatalog} items — use filters on the{' '}
                  <Link href="/products" className="text-accent underline-offset-4 hover:underline">
                    products page
                  </Link>
                  .
                </>
              )}
            </p>
          </div>

          {error ? null : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse rounded-lg border border-border bg-muted"
                    />
                  ))
                : products.map((product) => (
                    <ProductCard key={product.slug} {...product} />
                  ))}
            </div>
          )}
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
