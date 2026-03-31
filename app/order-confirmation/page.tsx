'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, Package, MapPin, Clock } from 'lucide-react'

export default function OrderConfirmationPage() {
  const orderNumber = 'ORD-' + Date.now()
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Success Message */}
        <div className="rounded-lg border border-border bg-card p-8 text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-2xl font-bold text-accent">{orderNumber}</p>
        </div>

        {/* Order Details */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Shipping */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-bold">Shipping Address</h2>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-medium">John Doe</p>
              <p className="text-muted-foreground">123 Main Street</p>
              <p className="text-muted-foreground">New York, NY 10001</p>
              <p className="text-muted-foreground">United States</p>
            </div>
          </div>

          {/* Delivery Estimate */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-bold">Estimated Delivery</h2>
            </div>
            <div className="text-sm">
              <p className="font-medium text-lg">{estimatedDelivery}</p>
              <p className="text-muted-foreground mt-2">
                We&apos;ll send you tracking information via email as soon as your order ships.
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-lg border border-border bg-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold">Order Items</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">Premium Wireless Headphones</p>
                <p className="text-sm text-muted-foreground">Qty: 1</p>
              </div>
              <p className="font-semibold">$199.99</p>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium">USB-C Hub Pro</p>
                <p className="text-sm text-muted-foreground">Qty: 1</p>
              </div>
              <p className="font-semibold">$79.99</p>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$279.98</span>
            </div>
            <div className="flex justify-between py-3 border-t border-border">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-500 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between py-3 border-t border-border">
              <span className="text-muted-foreground">Tax</span>
              <span>$22.40</span>
            </div>
            <div className="flex justify-between py-3 border-t border-border text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold">$302.38</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-lg border border-border bg-card p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">What&apos;s Next?</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-accent min-w-6">1</span>
              <span>A confirmation email has been sent to john@example.com</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent min-w-6">2</span>
              <span>We&apos;ll prepare your order and send tracking info within 24 hours</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent min-w-6">3</span>
              <span>Your order will arrive within 5-7 business days</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
            View Order Status
          </Button>
        </div>

        {/* Help */}
        <div className="mt-12 text-center border-t border-border pt-8">
          <p className="text-muted-foreground mb-4">
            Have questions? We&apos;re here to help!
          </p>
          <div className="flex flex-col gap-2 sm:flex-row items-center justify-center">
            <Link href="#" className="text-accent hover:underline">
              Contact Support
            </Link>
            <span className="hidden sm:inline text-border">•</span>
            <Link href="#" className="text-accent hover:underline">
              View FAQ
            </Link>
            <span className="hidden sm:inline text-border">•</span>
            <Link href="#" className="text-accent hover:underline">
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
