import type { ShophubListProduct, ShophubProductDetail } from './api'

export type CardProductProps = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  category?: string
}

export function listItemToCardProps(p: ShophubListProduct): CardProductProps {
  const image = p.thumbnail || ''
  const id = p._id != null ? String(p._id) : p.slug
  return {
    id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    image,
    category: p.category,
  }
}

export type DetailViewModel = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  images: string[]
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  description: string
  features?: string[]
  specifications?: Record<string, string>
  priceHistory?: { month: string; price: number }[]
}

function normalizeSpecs(
  specs: ShophubProductDetail['specifications']
): Record<string, string> | undefined {
  if (!specs || typeof specs !== 'object' || Array.isArray(specs)) return undefined
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(specs)) {
    out[k] = String(v)
  }
  return Object.keys(out).length ? out : undefined
}

export function detailToViewModel(p: ShophubProductDetail): DetailViewModel {
  const images =
    p.images?.length ? p.images : p.thumbnail ? [p.thumbnail] : []
  return {
    id: p._id != null ? String(p._id) : p.slug,
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: images[0] || '',
    images,
    category: p.category,
    rating: p.rating ?? 0,
    reviewCount: p.reviewCount ?? 0,
    inStock: p.inStock ?? true,
    description: p.description,
    specifications: normalizeSpecs(p.specifications),
    priceHistory: p.priceHistory,
  }
}
