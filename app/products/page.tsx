'use client'

import { Header } from '@/components/header'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ALL_PRODUCTS } from '@/lib/mock-products'

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Furniture']
const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Sellers']

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [showFilters, setShowFilters] = useState(true)

  // Filter products
  let filtered = ALL_PRODUCTS
  if (selectedCategory !== 'All') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
  }

  // Sort products
  if (sortBy === 'Price: Low to High') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'Price: High to Low') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Browse our complete collection of {filtered.length} products
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
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
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
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

                  {/* Sort */}
                  <div>
                    <h3 className="font-semibold mb-3">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
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

                  {/* In Stock */}
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

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-lg text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
