'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category?: string
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
    })
  }

  return (
    <div className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden transition-all hover:border-accent hover:shadow-lg">
      {/* Image */}
      <Link href={`/product/${id}`}>
        <div className="relative h-64 w-full overflow-hidden bg-muted flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%232a2a2a" width="100" height="100"/%3E%3C/svg%3E'
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {category && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {category}
          </p>
        )}
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-semibold group-hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">${price.toFixed(2)}</p>
          <Button
            size="icon"
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
