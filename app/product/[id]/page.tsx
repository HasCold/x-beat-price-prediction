'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { useCartStore } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import { useState, use } from 'react'
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { PRODUCTS_DETAILS } from '@/lib/mock-products'


export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = PRODUCTS_DETAILS[id] || PRODUCTS_DETAILS['1']
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(product.image)
  const [isFavorite, setIsFavorite] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
  }

  const relatedProducts = [
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
      name: 'Portable Power Bank',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
      category: 'Accessories',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex gap-2 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/products" className="text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                loading="eager"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%232a2a2a" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="%23a0a0a0" text-anchor="middle" dominant-baseline="middle"%3EImage unavailable%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
            {product.images && (
              <div className="flex gap-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 w-20 overflow-hidden rounded border-2 transition-colors flex-shrink-0 ${
                      selectedImage === img ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%232a2a2a" width="80" height="80"/%3E%3C/svg%3E'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="border-b border-t border-border py-4">
              <div className="flex items-baseline gap-4 mb-4">
                <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  {product.inStock ? (
                    <span className="text-green-500 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-destructive font-semibold">Out of Stock</span>
                  )}
                </p>
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? 'fill-destructive text-destructive' : ''
                    }`}
                  />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex gap-3">
                <Truck className="h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex gap-3">
                <RotateCcw className="h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day return policy</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Shield className="h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-sm">Secure Checkout</p>
                  <p className="text-xs text-muted-foreground">SSL encrypted payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Specifications */}
        {product.features && (
          <div className="mt-16 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-8">Features</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent-foreground">✓</span>
                  </div>
                  <p className="text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.specifications && (
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Specifications</h3>
            <div className="rounded border border-border overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <tr key={idx} className="border-b border-border last:border-b-0">
                      <td className="bg-muted px-4 py-3 font-semibold">{key}</td>
                      <td className="px-4 py-3">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Price History Chart */}
        {product.priceHistory && (
          <div className="mt-16 border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-8">Price History (Last 12 Months)</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    price: {
                      label: 'Price',
                      color: '#ffffff',
                    },
                  }}
                  className="h-[400px] w-full"
                >
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={product.priceHistory}
                      margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#a0a0a0"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#a0a0a0"
                        style={{ fontSize: '12px' }}
                        label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', style: { fill: '#a0a0a0' } }}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value) => {
                          const n = Number(value)
                          return `$${Number.isFinite(n) ? n.toFixed(2) : String(value)}`
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#ffffff"
                        strokeWidth={2}
                        dot={{ fill: '#ffffff', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Price"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Related Products */}
        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
