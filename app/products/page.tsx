'use client'

import { Header } from '@/components/header'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { shophubGetCategories, shophubGetProducts } from '@/lib/api'
import { listItemToCardProps } from '@/lib/shophub-mappers'
import { useCallback, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Sellers', value: 'popular' },
] as const

export default function ProductsPage() {
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortValue, setSortValue] = useState<(typeof SORT_OPTIONS)[number]['value']>('newest')
  const [showFilters, setShowFilters] = useState(true)
  const [products, setProducts] = useState<ReturnType<typeof listItemToCardProps>[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCategories = useCallback(() => {
    shophubGetCategories()
      .then((res) => setCategories(res.data.filter(Boolean)))
      .catch(() => setCategories([]))
  }, [])

  const loadProducts = useCallback(() => {
    setLoading(true)
    setError(null)
    const sort =
      sortValue === 'newest'
        ? undefined
        : (sortValue as 'price_asc' | 'price_desc' | 'popular')

    shophubGetProducts({
      page: 1,
      limit: 100,
      category: selectedCategory === 'All' ? undefined : selectedCategory,
      sort,
    })
      .then((res) => {
        setProducts(res.data.map(listItemToCardProps))
        setTotal(res.pagination?.total ?? res.data.length)
      })
      .catch((e: Error) => setError(e.message || 'Failed to load products'))
      .finally(() => setLoading(false))
  }, [selectedCategory, sortValue])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const categoryOptions = ['All', ...categories]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            {loading ? 'Loading…' : error ? error : `Browse our complete collection of ${total} products`}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="mb-6 flex items-center justify-between lg:block">
                <h2 className="text-lg font-bold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              {(showFilters || typeof window === 'undefined') && (
                <div className="space-y-6 hidden lg:block">
                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {categoryOptions.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                          className={`block text-sm w-full text-left px-2 py-1 rounded transition-colors ${
                            selectedCategory === category
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Sort By</h3>
                    <select
                      value={sortValue}
                      onChange={(e) =>
                        setSortValue(e.target.value as (typeof SORT_OPTIONS)[number]['value'])
                      }
                      className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        Under $100
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        $100 - $250
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        $250 - $500
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        Over $500
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" defaultChecked />
                      In Stock Only
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            {error ? (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-lg text-muted-foreground">{error}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Run the Bachat Bazaar backend (MongoDB + seed) and set{' '}
                  <code className="text-xs">NEXT_PUBLIC_API_URL</code> if needed.
                </p>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-lg border border-border bg-muted" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-lg text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
