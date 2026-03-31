'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to homepage as no auth is needed
    const timer = setTimeout(() => {
      router.push('/')
    }, 2000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">No Authentication Required</h1>
          <p className="text-muted-foreground mb-6">
            Start shopping right away! You can browse our products and checkout without creating an account.
          </p>
          <Link href="/">
            <Button className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    </>
  )
}
