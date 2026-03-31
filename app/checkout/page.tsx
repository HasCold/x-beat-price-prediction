'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setError('')
    if (step === 1) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode
      ) {
        setError('Please fill in all shipping fields')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        setError('Please fill in all payment fields')
        return
      }
      setStep(3)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    setError('')

    try {
      // TODO: Replace with actual API call to backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful order
      clearCart()
      router.push('/order-confirmation')
    } catch (err) {
      setError('Failed to process order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const total = getTotalPrice()
  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08
  const grandTotal = total + tax + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground mb-6">Your cart is empty</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="mb-8 flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                      s <= step
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-border text-muted-foreground'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <ChevronRight
                      className={`h-5 w-5 ${
                        s <= step ? 'text-primary' : 'text-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            {step >= 1 && (
              <div className="rounded-lg border border-border bg-card p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={step > 1}
                      className="rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={step > 1}
                      className="rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={step > 1}
                    className="w-full rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={step > 1}
                    className="w-full rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={step > 1}
                    className="w-full rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={step > 1}
                      className="rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={step > 1}
                      className="rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                    />
                  </div>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    disabled={step > 1}
                    className="w-full rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                  />
                </div>
                {step === 1 && (
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleNext}>
                    Continue to Payment
                  </Button>
                )}
              </div>
            )}

            {/* Payment Info */}
            {step >= 2 && (
              <div className="rounded-lg border border-border bg-card p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    disabled={step > 2}
                    className="w-full rounded border border-border bg-background px-3 py-2 font-mono disabled:bg-muted disabled:text-muted-foreground"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      disabled={step > 2}
                      className="rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      disabled={step > 2}
                      className="rounded border border-border bg-background px-3 py-2 disabled:bg-muted disabled:text-muted-foreground"
                    />
                  </div>
                </div>
                {step === 2 && (
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleNext}>
                    Review Order
                  </Button>
                )}
              </div>
            )}

            {/* Review */}
            {step === 3 && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Shipping to:</p>
                    <p className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">Card ending in:</p>
                    <p className="font-medium">
                      •••• {formData.cardNumber.slice(-4)}
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="rounded bg-destructive/10 p-3 text-sm text-destructive mb-4">
                    {error}
                  </div>
                )}

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            )}

            {error && step < 3 && (
              <div className="rounded bg-destructive/10 p-3 text-sm text-destructive mt-4">
                {error}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="rounded-lg border border-border bg-card p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
