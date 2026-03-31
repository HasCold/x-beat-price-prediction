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

// Mock product data
const PRODUCTS: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    rating: 4.8,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487215737519-e21cc028cb29?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    ],
    category: 'Electronics',
    inStock: true,
    description:
      'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.',
    features: [
      'Active Noise Cancellation',
      '30-Hour Battery Life',
      'Premium Comfort Padding',
      'Wireless & Wired Connectivity',
      'Built-in Microphone',
      'Foldable Design',
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Connector': '3.5mm & Bluetooth 5.0',
      'Weight': '250g',
    },
    priceHistory: [
      { month: 'Jan', price: 179.99 },
      { month: 'Feb', price: 185.99 },
      { month: 'Mar', price: 189.99 },
      { month: 'Apr', price: 195.99 },
      { month: 'May', price: 199.99 },
      { month: 'Jun', price: 199.99 },
      { month: 'Jul', price: 209.99 },
      { month: 'Aug', price: 219.99 },
      { month: 'Sep', price: 215.99 },
      { month: 'Oct', price: 205.99 },
      { month: 'Nov', price: 199.99 },
      { month: 'Dec', price: 199.99 },
    ],
  },
  '2': {
    id: '2',
    name: 'Ultra HD 4K Monitor',
    price: 349.99,
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
    category: 'Electronics',
    inStock: true,
    description: 'Professional-grade 4K monitor with HDR support and 99% Adobe RGB color gamut.',
    priceHistory: [
      { month: 'Jan', price: 299.99 },
      { month: 'Feb', price: 309.99 },
      { month: 'Mar', price: 319.99 },
      { month: 'Apr', price: 329.99 },
      { month: 'May', price: 339.99 },
      { month: 'Jun', price: 349.99 },
      { month: 'Jul', price: 349.99 },
      { month: 'Aug', price: 359.99 },
      { month: 'Sep', price: 359.99 },
      { month: 'Oct', price: 349.99 },
      { month: 'Nov', price: 349.99 },
      { month: 'Dec', price: 349.99 },
    ],
  },
  '3': {
    id: '3',
    name: 'Professional Camera Bag',
    price: 129.99,
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    category: 'Accessories',
    inStock: true,
    description: 'Premium camera bag with weather-resistant material and padded compartments.',
    features: [
      'Weather-resistant material',
      'Padded compartments',
      'Comfortable straps',
      'Multiple pockets',
      'Compact design',
    ],
    specifications: {
      'Material': 'Polyester',
      'Capacity': '25L',
      'Weight': '800g',
      'Dimensions': '45x30x20cm',
    },
    priceHistory: [
      { month: 'Jan', price: 109.99 },
      { month: 'Feb', price: 114.99 },
      { month: 'Mar', price: 119.99 },
      { month: 'Apr', price: 124.99 },
      { month: 'May', price: 129.99 },
      { month: 'Jun', price: 129.99 },
      { month: 'Jul', price: 134.99 },
      { month: 'Aug', price: 134.99 },
      { month: 'Sep', price: 129.99 },
      { month: 'Oct', price: 124.99 },
      { month: 'Nov', price: 129.99 },
      { month: 'Dec', price: 129.99 },
    ],
  },
  '4': {
    id: '4',
    name: 'Mechanical Gaming Keyboard',
    price: 159.99,
    rating: 4.7,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop',
    category: 'Electronics',
    inStock: true,
    description: 'RGB mechanical keyboard with customizable switches and programmable keys.',
    features: [
      'Mechanical switches',
      'RGB backlighting',
      'Programmable keys',
      'Wired connection',
      'Aluminum frame',
    ],
    specifications: {
      'Switch type': 'Cherry MX',
      'Layout': 'Full size',
      'Connection': 'USB 2.0',
      'Weight': '1.2kg',
    },
    priceHistory: [
      { month: 'Jan', price: 139.99 },
      { month: 'Feb', price: 144.99 },
      { month: 'Mar', price: 149.99 },
      { month: 'Apr', price: 154.99 },
      { month: 'May', price: 159.99 },
      { month: 'Jun', price: 159.99 },
      { month: 'Jul', price: 164.99 },
      { month: 'Aug', price: 169.99 },
      { month: 'Sep', price: 164.99 },
      { month: 'Oct', price: 159.99 },
      { month: 'Nov', price: 159.99 },
      { month: 'Dec', price: 159.99 },
    ],
  },
  '5': {
    id: '5',
    name: 'Portable Power Bank 20000mAh',
    price: 49.99,
    rating: 4.4,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop',
    category: 'Accessories',
    inStock: true,
    description: 'High-capacity power bank with dual USB ports and fast charging support.',
    features: [
      '20000mAh capacity',
      'Dual USB ports',
      'Fast charging',
      'LED display',
      'Compact design',
    ],
    specifications: {
      'Capacity': '20000mAh',
      'Ports': 'USB A x2, USB C',
      'Weight': '360g',
      'Charging time': '4 hours',
    },
    priceHistory: [
      { month: 'Jan', price: 39.99 },
      { month: 'Feb', price: 41.99 },
      { month: 'Mar', price: 43.99 },
      { month: 'Apr', price: 45.99 },
      { month: 'May', price: 49.99 },
      { month: 'Jun', price: 49.99 },
      { month: 'Jul', price: 49.99 },
      { month: 'Aug', price: 49.99 },
      { month: 'Sep', price: 49.99 },
      { month: 'Oct', price: 49.99 },
      { month: 'Nov', price: 49.99 },
      { month: 'Dec', price: 49.99 },
    ],
  },
  '6': {
    id: '6',
    name: 'Ergonomic Desk Chair',
    price: 299.99,
    rating: 4.6,
    reviews: 123,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=800&fit=crop',
    category: 'Furniture',
    inStock: true,
    description: 'Premium ergonomic chair with lumbar support and adjustable armrests.',
    features: [
      'Lumbar support',
      'Adjustable armrests',
      'Breathable mesh',
      'Height adjustment',
      'Tilt mechanism',
    ],
    specifications: {
      'Material': 'Mesh back, PU base',
      'Max load': '150kg',
      'Height range': '45-55cm',
      'Casters': 'Nylon',
    },
    priceHistory: [
      { month: 'Jan', price: 249.99 },
      { month: 'Feb', price: 259.99 },
      { month: 'Mar', price: 269.99 },
      { month: 'Apr', price: 279.99 },
      { month: 'May', price: 289.99 },
      { month: 'Jun', price: 299.99 },
      { month: 'Jul', price: 299.99 },
      { month: 'Aug', price: 299.99 },
      { month: 'Sep', price: 299.99 },
      { month: 'Oct', price: 299.99 },
      { month: 'Nov', price: 299.99 },
      { month: 'Dec', price: 299.99 },
    ],
  },
  '7': {
    id: '7',
    name: 'USB-C Hub Pro',
    price: 79.99,
    rating: 4.5,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop',
    category: 'Accessories',
    inStock: true,
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    features: [
      '7-in-1 functionality',
      'HDMI 4K output',
      'USB 3.0 ports',
      'SD card reader',
      'Aluminum design',
    ],
    specifications: {
      'Ports': 'HDMI, USB 3.0 x3, SD, microSD, USB-C',
      'Max power delivery': '100W',
      'Material': 'Aluminum',
      'Length': '15cm',
    },
    priceHistory: [
      { month: 'Jan', price: 59.99 },
      { month: 'Feb', price: 64.99 },
      { month: 'Mar', price: 69.99 },
      { month: 'Apr', price: 74.99 },
      { month: 'May', price: 79.99 },
      { month: 'Jun', price: 79.99 },
      { month: 'Jul', price: 79.99 },
      { month: 'Aug', price: 79.99 },
      { month: 'Sep', price: 79.99 },
      { month: 'Oct', price: 79.99 },
      { month: 'Nov', price: 79.99 },
      { month: 'Dec', price: 79.99 },
    ],
  },
  '8': {
    id: '8',
    name: '27" IPS LED Monitor',
    price: 279.99,
    rating: 4.5,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    inStock: true,
    description: 'Full HD IPS monitor with excellent color accuracy and wide viewing angles.',
    features: [
      '1920x1080 resolution',
      'IPS panel',
      '99% sRGB coverage',
      'HDMI & DisplayPort',
      'Height adjustable',
    ],
    specifications: {
      'Resolution': '1920x1080',
      'Panel': 'IPS',
      'Refresh rate': '60Hz',
      'Response time': '5ms',
    },
    priceHistory: [
      { month: 'Jan', price: 229.99 },
      { month: 'Feb', price: 239.99 },
      { month: 'Mar', price: 249.99 },
      { month: 'Apr', price: 259.99 },
      { month: 'May', price: 269.99 },
      { month: 'Jun', price: 279.99 },
      { month: 'Jul', price: 279.99 },
      { month: 'Aug', price: 279.99 },
      { month: 'Sep', price: 279.99 },
      { month: 'Oct', price: 279.99 },
      { month: 'Nov', price: 279.99 },
      { month: 'Dec', price: 279.99 },
    ],
  },
  '9': {
    id: '9',
    name: 'Wireless Mouse Pro',
    price: 59.99,
    rating: 4.4,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop',
    category: 'Electronics',
    inStock: true,
    description: 'Precision wireless mouse with adjustable DPI and 6 programmable buttons.',
    features: [
      'Wireless 2.4GHz',
      'Adjustable DPI',
      '6 programmable buttons',
      '12-month battery',
      'Ergonomic design',
    ],
    specifications: {
      'Connection': 'Wireless 2.4GHz',
      'DPI range': '800-3200',
      'Battery': 'AA x2',
      'Weight': '95g',
    },
    priceHistory: [
      { month: 'Jan', price: 49.99 },
      { month: 'Feb', price: 51.99 },
      { month: 'Mar', price: 53.99 },
      { month: 'Apr', price: 55.99 },
      { month: 'May', price: 59.99 },
      { month: 'Jun', price: 59.99 },
      { month: 'Jul', price: 59.99 },
      { month: 'Aug', price: 59.99 },
      { month: 'Sep', price: 59.99 },
      { month: 'Oct', price: 59.99 },
      { month: 'Nov', price: 59.99 },
      { month: 'Dec', price: 59.99 },
    ],
  },
  '10': {
    id: '10',
    name: 'Laptop Stand Premium',
    price: 49.99,
    rating: 4.3,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&h=800&fit=crop',
    category: 'Accessories',
    inStock: true,
    description: 'Adjustable aluminum laptop stand with anti-slip base.',
    features: [
      'Aluminum construction',
      'Adjustable angles',
      'Foldable design',
      'Anti-slip pads',
      'Portable',
    ],
    specifications: {
      'Material': 'Aluminum alloy',
      'Max load': '10kg',
      'Height range': '12-30cm',
      'Weight': '450g',
    },
    priceHistory: [
      { month: 'Jan', price: 39.99 },
      { month: 'Feb', price: 41.99 },
      { month: 'Mar', price: 43.99 },
      { month: 'Apr', price: 45.99 },
      { month: 'May', price: 49.99 },
      { month: 'Jun', price: 49.99 },
      { month: 'Jul', price: 49.99 },
      { month: 'Aug', price: 49.99 },
      { month: 'Sep', price: 49.99 },
      { month: 'Oct', price: 49.99 },
      { month: 'Nov', price: 49.99 },
      { month: 'Dec', price: 49.99 },
    ],
  },
  '11': {
    id: '11',
    name: 'Mechanical Desk Lamp',
    price: 89.99,
    rating: 4.6,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=800&h=800&fit=crop',
    category: 'Furniture',
    inStock: true,
    description: 'Modern desk lamp with adjustable brightness and color temperature.',
    features: [
      'Adjustable brightness',
      'Color temperature control',
      'Memory function',
      'Touch controls',
      'USB charging port',
    ],
    specifications: {
      'Power': '10W LED',
      'Color temp': '3000-5500K',
      'Brightness levels': '5',
      'Material': 'Aluminum & plastic',
    },
    priceHistory: [
      { month: 'Jan', price: 69.99 },
      { month: 'Feb', price: 74.99 },
      { month: 'Mar', price: 79.99 },
      { month: 'Apr', price: 84.99 },
      { month: 'May', price: 89.99 },
      { month: 'Jun', price: 89.99 },
      { month: 'Jul', price: 89.99 },
      { month: 'Aug', price: 89.99 },
      { month: 'Sep', price: 89.99 },
      { month: 'Oct', price: 89.99 },
      { month: 'Nov', price: 89.99 },
      { month: 'Dec', price: 89.99 },
    ],
  },
  '12': {
    id: '12',
    name: 'Portable SSD 1TB',
    price: 119.99,
    rating: 4.7,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=800&fit=crop',
    category: 'Electronics',
    inStock: true,
    description: 'Ultra-fast portable SSD with 1TB storage and USB 3.1 Gen 2 interface.',
    features: [
      '1TB storage',
      'USB 3.1 Gen 2',
      'Shock resistant',
      'Compact design',
      'Hardware encryption',
    ],
    specifications: {
      'Capacity': '1TB',
      'Interface': 'USB 3.1 Gen 2',
      'Speed': 'Up to 1050 MB/s',
      'Weight': '180g',
    },
    priceHistory: [
      { month: 'Jan', price: 99.99 },
      { month: 'Feb', price: 104.99 },
      { month: 'Mar', price: 109.99 },
      { month: 'Apr', price: 114.99 },
      { month: 'May', price: 119.99 },
      { month: 'Jun', price: 119.99 },
      { month: 'Jul', price: 119.99 },
      { month: 'Aug', price: 119.99 },
      { month: 'Sep', price: 119.99 },
      { month: 'Oct', price: 119.99 },
      { month: 'Nov', price: 119.99 },
      { month: 'Dec', price: 119.99 },
    ],
  },
}

const SEEDED_PRODUCTS: Record<string, any> = {
  '1': {
    name: 'Premium Wireless Headphones',
    price: 199.99,
    rating: 4.8,
    reviews: 324,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487215737519-e21cc028cb29?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    ],
    category: 'Electronics',
    inStock: true,
    description:
      'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.',
    features: [
      'Active Noise Cancellation',
      '30-Hour Battery Life',
      'Premium Comfort Padding',
      'Wireless & Wired Connectivity',
      'Built-in Microphone',
      'Foldable Design',
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Connector': '3.5mm & Bluetooth 5.0',
      'Weight': '250g',
    },
    priceHistory: [
      { month: 'Jan', price: 179.99 },
      { month: 'Feb', price: 185.99 },
      { month: 'Mar', price: 189.99 },
      { month: 'Apr', price: 195.99 },
      { month: 'May', price: 199.99 },
      { month: 'Jun', price: 199.99 },
      { month: 'Jul', price: 209.99 },
      { month: 'Aug', price: 219.99 },
      { month: 'Sep', price: 215.99 },
      { month: 'Oct', price: 205.99 },
      { month: 'Nov', price: 199.99 },
      { month: 'Dec', price: 199.99 },
    ],
  },

  '2': {
    name: 'Ultra HD 4K Monitor',
    price: 349.99,
    rating: 4.6,
    reviews: 156,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
    category: 'Electronics',
    inStock: true,
    description: 'Professional-grade 4K monitor with HDR support and 99% Adobe RGB color gamut.',
    priceHistory: [
      { month: 'Jan', price: 299.99 },
      { month: 'Feb', price: 309.99 },
      { month: 'Mar', price: 319.99 },
      { month: 'Apr', price: 329.99 },
      { month: 'May', price: 339.99 },
      { month: 'Jun', price: 349.99 },
      { month: 'Jul', price: 349.99 },
      { month: 'Aug', price: 359.99 },
      { month: 'Sep', price: 359.99 },
      { month: 'Oct', price: 349.99 },
      { month: 'Nov', price: 349.99 },
      { month: 'Dec', price: 349.99 },
    ],
  },

  '3': {
    name: 'Professional Camera Bag',
    price: 129.99,
    rating: 4.5,
    reviews: 89,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    category: 'Accessories',
    inStock: true,
    description: 'Premium camera bag with weather-resistant material and padded compartments.',
    features: [
      'Weather-resistant material',
      'Padded compartments',
      'Comfortable straps',
      'Multiple pockets',
      'Compact design',
    ],
    specifications: {
      Material: 'Polyester',
      Capacity: '25L',
      Weight: '800g',
      Dimensions: '45x30x20cm',
    },
    priceHistory: [
      { month: 'Jan', price: 109.99 },
      { month: 'Feb', price: 114.99 },
      { month: 'Mar', price: 119.99 },
      { month: 'Apr', price: 124.99 },
      { month: 'May', price: 129.99 },
      { month: 'Jun', price: 129.99 },
      { month: 'Jul', price: 134.99 },
      { month: 'Aug', price: 134.99 },
      { month: 'Sep', price: 129.99 },
      { month: 'Oct', price: 124.99 },
      { month: 'Nov', price: 129.99 },
      { month: 'Dec', price: 129.99 },
    ],
  },

  '4': {
    name: 'Mechanical Gaming Keyboard',
    price: 159.99,
    rating: 4.7,
    reviews: 234,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop',
    category: 'Electronics',
    inStock: true,
    description: 'RGB mechanical keyboard with customizable switches and programmable keys.',
    features: [
      'Mechanical switches',
      'RGB backlighting',
      'Programmable keys',
      'Wired connection',
      'Aluminum frame',
    ],
    specifications: {
      'Switch type': 'Cherry MX',
      Layout: 'Full size',
      Connection: 'USB 2.0',
      Weight: '1.2kg',
    },
    priceHistory: [
      { month: 'Jan', price: 139.99 },
      { month: 'Feb', price: 144.99 },
      { month: 'Mar', price: 149.99 },
      { month: 'Apr', price: 154.99 },
      { month: 'May', price: 159.99 },
      { month: 'Jun', price: 159.99 },
      { month: 'Jul', price: 164.99 },
      { month: 'Aug', price: 169.99 },
      { month: 'Sep', price: 164.99 },
      { month: 'Oct', price: 159.99 },
      { month: 'Nov', price: 159.99 },
      { month: 'Dec', price: 159.99 },
    ],
  },

  '5': {
    name: 'Portable Power Bank 20000mAh',
    price: 49.99,
    rating: 4.4,
    reviews: 567,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop',
    category: 'Accessories',
    inStock: true,
    description: 'High-capacity power bank with dual USB ports and fast charging support.',
    features: [
      '20000mAh capacity',
      'Dual USB ports',
      'Fast charging',
      'LED display',
      'Compact design',
    ],
    specifications: {
      Capacity: '20000mAh',
      Ports: 'USB A x2, USB C',
      Weight: '360g',
      ChargingTime: '4 hours',
    },
    priceHistory: [
      { month: 'Jan', price: 39.99 },
      { month: 'Feb', price: 41.99 },
      { month: 'Mar', price: 43.99 },
      { month: 'Apr', price: 45.99 },
      { month: 'May', price: 49.99 },
      { month: 'Jun', price: 49.99 },
      { month: 'Jul', price: 49.99 },
      { month: 'Aug', price: 49.99 },
      { month: 'Sep', price: 49.99 },
      { month: 'Oct', price: 49.99 },
      { month: 'Nov', price: 49.99 },
      { month: 'Dec', price: 49.99 },
    ],
  },

  '6': {
    name: 'Ergonomic Desk Chair',
    price: 299.99,
    rating: 4.6,
    reviews: 123,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=800&fit=crop',
    category: 'Furniture',
    inStock: true,
    description: 'Premium ergonomic chair with lumbar support and adjustable armrests.',
    features: [
      'Lumbar support',
      'Adjustable armrests',
      'Breathable mesh',
      'Height adjustment',
      'Tilt mechanism',
    ],
    specifications: {
      Material: 'Mesh back, PU base',
      'Max load': '150kg',
      'Height range': '45-55cm',
      Casters: 'Nylon',
    },
    priceHistory: [
      { month: 'Jan', price: 249.99 },
      { month: 'Feb', price: 259.99 },
      { month: 'Mar', price: 269.99 },
      { month: 'Apr', price: 279.99 },
      { month: 'May', price: 289.99 },
      { month: 'Jun', price: 299.99 },
      { month: 'Jul', price: 299.99 },
      { month: 'Aug', price: 299.99 },
      { month: 'Sep', price: 299.99 },
      { month: 'Oct', price: 299.99 },
      { month: 'Nov', price: 299.99 },
      { month: 'Dec', price: 299.99 },
    ],
  },

  '7': {
    name: 'USB-C Hub Pro',
    price: 79.99,
    rating: 4.5,
    reviews: 198,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop',
    category: 'Accessories',
    inStock: true,
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    features: [
      '7-in-1 functionality',
      'HDMI 4K output',
      'USB 3.0 ports',
      'SD card reader',
      'Aluminum design',
    ],
    specifications: {
      Ports: 'HDMI, USB 3.0 x3, SD, microSD, USB-C',
      'Max power delivery': '100W',
      Material: 'Aluminum',
      Length: '15cm',
    },
    priceHistory: [
      { month: 'Jan', price: 59.99 },
      { month: 'Feb', price: 64.99 },
      { month: 'Mar', price: 69.99 },
      { month: 'Apr', price: 74.99 },
      { month: 'May', price: 79.99 },
      { month: 'Jun', price: 79.99 },
      { month: 'Jul', price: 79.99 },
      { month: 'Aug', price: 79.99 },
      { month: 'Sep', price: 79.99 },
      { month: 'Oct', price: 79.99 },
      { month: 'Nov', price: 79.99 },
      { month: 'Dec', price: 79.99 },
    ],
  },

  '8': {
    name: '27" IPS LED Monitor',
    price: 279.99,
    rating: 4.5,
    reviews: 145,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    inStock: true,
    description: 'Full HD IPS monitor with excellent color accuracy and wide viewing angles.',
    features: [
      '1920x1080 resolution',
      'IPS panel',
      '99% sRGB coverage',
      'HDMI & DisplayPort',
      'Height adjustable',
    ],
    specifications: {
      Resolution: '1920x1080',
      Panel: 'IPS',
      'Refresh rate': '60Hz',
      'Response time': '5ms',
    },
    priceHistory: [
      { month: 'Jan', price: 229.99 },
      { month: 'Feb', price: 239.99 },
      { month: 'Mar', price: 249.99 },
      { month: 'Apr', price: 259.99 },
      { month: 'May', price: 269.99 },
      { month: 'Jun', price: 279.99 },
      { month: 'Jul', price: 279.99 },
      { month: 'Aug', price: 279.99 },
      { month: 'Sep', price: 279.99 },
      { month: 'Oct', price: 279.99 },
      { month: 'Nov', price: 279.99 },
      { month: 'Dec', price: 279.99 },
    ],
  },

  '9': {
    name: 'Wireless Mouse Pro',
    price: 59.99,
    rating: 4.4,
    reviews: 412,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop',
    category: 'Electronics',
    inStock: true,
    description: 'Precision wireless mouse with adjustable DPI and 6 programmable buttons.',
    features: [
      'Wireless 2.4GHz',
      'Adjustable DPI',
      '6 programmable buttons',
      '12-month battery',
      'Ergonomic design',
    ],
    specifications: {
      Connection: 'Wireless 2.4GHz',
      'DPI range': '800-3200',
      Battery: 'AA x2',
      Weight: '95g',
    },
    priceHistory: [
      { month: 'Jan', price: 49.99 },
      { month: 'Feb', price: 51.99 },
      { month: 'Mar', price: 53.99 },
      { month: 'Apr', price: 55.99 },
      { month: 'May', price: 59.99 },
      { month: 'Jun', price: 59.99 },
      { month: 'Jul', price: 59.99 },
      { month: 'Aug', price: 59.99 },
      { month: 'Sep', price: 59.99 },
      { month: 'Oct', price: 59.99 },
      { month: 'Nov', price: 59.99 },
      { month: 'Dec', price: 59.99 },
    ],
  },

  '10': {
    name: 'Laptop Stand Premium',
    price: 49.99,
    rating: 4.3,
    reviews: 234,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&h=800&fit=crop',
    category: 'Accessories',
    inStock: true,
    description: 'Adjustable aluminum laptop stand with anti-slip base.',
    features: [
      'Aluminum construction',
      'Adjustable angles',
      'Foldable design',
      'Anti-slip pads',
      'Portable',
    ],
    specifications: {
      Material: 'Aluminum alloy',
      'Max load': '10kg',
      'Height range': '12-30cm',
      Weight: '450g',
    },
    priceHistory: [
      { month: 'Jan', price: 39.99 },
      { month: 'Feb', price: 41.99 },
      { month: 'Mar', price: 43.99 },
      { month: 'Apr', price: 45.99 },
      { month: 'May', price: 49.99 },
      { month: 'Jun', price: 49.99 },
      { month: 'Jul', price: 49.99 },
      { month: 'Aug', price: 49.99 },
      { month: 'Sep', price: 49.99 },
      { month: 'Oct', price: 49.99 },
      { month: 'Nov', price: 49.99 },
      { month: 'Dec', price: 49.99 },
    ],
  },

  '11': {
    name: 'Mechanical Desk Lamp',
    price: 89.99,
    rating: 4.6,
    reviews: 167,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=800&h=800&fit=crop',
    category: 'Furniture',
    inStock: true,
    description: 'Modern desk lamp with adjustable brightness and color temperature.',
    features: [
      'Adjustable brightness',
      'Color temperature control',
      'Memory function',
      'Touch controls',
      'USB charging port',
    ],
    specifications: {
      Power: '10W LED',
      'Color temp': '3000-5500K',
      'Brightness levels': '5',
      Material: 'Aluminum & plastic',
    },
    priceHistory: [
      { month: 'Jan', price: 69.99 },
      { month: 'Feb', price: 74.99 },
      { month: 'Mar', price: 79.99 },
      { month: 'Apr', price: 84.99 },
      { month: 'May', price: 89.99 },
      { month: 'Jun', price: 89.99 },
      { month: 'Jul', price: 89.99 },
      { month: 'Aug', price: 89.99 },
      { month: 'Sep', price: 89.99 },
      { month: 'Oct', price: 89.99 },
      { month: 'Nov', price: 89.99 },
      { month: 'Dec', price: 89.99 },
    ],
  },

  '12': {
    name: 'Portable SSD 1TB',
    price: 119.99,
    rating: 4.7,
    reviews: 342,
    platform: 'shophub',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=800&fit=crop',
    category: 'Electronics',
    inStock: true,
    description: 'Ultra-fast portable SSD with 1TB storage and USB 3.1 Gen 2 interface.',
    features: [
      '1TB storage',
      'USB 3.1 Gen 2',
      'Shock resistant',
      'Compact design',
      'Hardware encryption',
    ],
    specifications: {
      Capacity: '1TB',
      Interface: 'USB 3.1 Gen 2',
      'Speed': 'Up to 1050 MB/s',
      Weight: '180g',
    },
    priceHistory: [
      { month: 'Jan', price: 99.99 },
      { month: 'Feb', price: 104.99 },
      { month: 'Mar', price: 109.99 },
      { month: 'Apr', price: 114.99 },
      { month: 'May', price: 119.99 },
      { month: 'Jun', price: 119.99 },
      { month: 'Jul', price: 119.99 },
      { month: 'Aug', price: 119.99 },
      { month: 'Sep', price: 119.99 },
      { month: 'Oct', price: 119.99 },
      { month: 'Nov', price: 119.99 },
      { month: 'Dec', price: 119.99 },
    ],
  },
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = PRODUCTS[id] || PRODUCTS['1']
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
                        formatter={(value) => `$${value.toFixed(2)}`}
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
