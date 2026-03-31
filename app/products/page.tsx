'use client'

import { Header } from '@/components/header'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Mock data - will be replaced with API calls
const ALL_PRODUCTS = [
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
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=500&q=80',
    category: 'Electronics',
  },
  {
    id: '9',
    name: 'Wireless Mouse Pro',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    id: '10',
    name: 'Laptop Stand Premium',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&h=500&fit=crop',
    category: 'Accessories',
  },
  {
    id: '11',
    name: 'Mechanical Desk Lamp',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
    category: 'Furniture',
  },
  {
    id: '12',
    name: 'Portable SSD 1TB',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
]

const SEEDED_ALL_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    platform: 'shophub',
  },
  {
    id: '2',
    name: 'Ultra HD 4K Monitor',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Electronics',
    platform: 'shophub',
  },
  {
    id: '3',
    name: 'Professional Camera Bag',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
    platform: 'shophub',
  },
  {
    id: '4',
    name: 'Mechanical Gaming Keyboard',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
    category: 'Electronics',
    platform: 'shophub',
  },
  {
    id: '5',
    name: 'Portable Power Bank 20000mAh',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    category: 'Accessories',
    platform: 'shophub',
  },
  {
    id: '6',
    name: 'Ergonomic Desk Chair',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop',
    category: 'Furniture',
    platform: 'shophub',
  },
  {
    id: '7',
    name: 'USB-C Hub Pro',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    category: 'Accessories',
    platform: 'shophub',
  },
  {
    id: '8',
    name: '27" IPS LED Monitor',
    price: 279.99,
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=500&q=80',
    category: 'Electronics',
    platform: 'shophub',
  },
  {
    id: '9',
    name: 'Wireless Mouse Pro',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'Electronics',
    platform: 'shophub',
  },
  {
    id: '10',
    name: 'Laptop Stand Premium',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&h=500&fit=crop',
    category: 'Accessories',
    platform: 'shophub',
  },
  {
    id: '11',
    name: 'Mechanical Desk Lamp',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
    category: 'Furniture',
    platform: 'shophub',
  },
  {
    id: '12',
    name: 'Portable SSD 1TB',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    category: 'Electronics',
    platform: 'shophub',
  },
];

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Furniture']
const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Sellers']

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [showFilters, setShowFilters] = useState(true)

  // Filter products
  let filtered = ALL_PRODUCTS
  if (selectedCategory !== 'All') {
    filtered = filtered.filter((p) => p.category === selectedCategory)
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
