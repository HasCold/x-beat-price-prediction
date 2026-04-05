const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export type ShophubListProduct = {
  _id?: string
  name: string
  slug: string
  thumbnail?: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  brand?: string
  rating?: number
  reviewCount?: number
  inStock?: boolean
  badge?: string
  featured?: boolean
  shortDescription?: string
}

export type ShophubProductDetail = ShophubListProduct & {
  description: string
  images?: string[]
  stock?: number
  reviews?: { user: string; avatar?: string; rating: number; comment: string; date?: string }[]
  priceHistory?: { month: string; price: number }[]
  tags?: string[]
  specifications?: Record<string, string>
}

type ApiResponse<T> = {
  success: boolean
  data: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  message?: string
}

async function parseJson<T>(res: Response): Promise<ApiResponse<T>> {
  const body = (await res.json()) as ApiResponse<T>
  if (!res.ok) {
    throw new Error(body.message || res.statusText || 'Request failed')
  }
  return body
}

export async function shophubGetProducts(params: {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'popular'
  minPrice?: number
  maxPrice?: number
}) {
  const q = new URLSearchParams()
  if (params.page != null) q.set('page', String(params.page))
  if (params.limit != null) q.set('limit', String(params.limit))
  if (params.category && params.category !== 'all') q.set('category', params.category)
  if (params.search) q.set('search', params.search)
  if (params.sort) q.set('sort', params.sort)
  if (params.minPrice != null) q.set('minPrice', String(params.minPrice))
  if (params.maxPrice != null) q.set('maxPrice', String(params.maxPrice))
  const res = await fetch(`${API_BASE}/shophub/products?${q.toString()}`, {
    cache: 'no-store',
  })
  return parseJson<ShophubListProduct[]>(res)
}

export async function shophubGetFeaturedProducts() {
  const res = await fetch(`${API_BASE}/shophub/products/featured`, { cache: 'no-store' })
  return parseJson<ShophubListProduct[]>(res)
}

export async function shophubGetCategories() {
  const res = await fetch(`${API_BASE}/shophub/products/categories`, { cache: 'no-store' })
  return parseJson<string[]>(res)
}

export async function shophubGetProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/shophub/products/${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  })
  return parseJson<ShophubProductDetail>(res)
}

export async function shophubGetRelatedProducts(slug: string) {
  const res = await fetch(
    `${API_BASE}/shophub/products/${encodeURIComponent(slug)}/related`,
    { cache: 'no-store' }
  )
  return parseJson<ShophubListProduct[]>(res)
}
