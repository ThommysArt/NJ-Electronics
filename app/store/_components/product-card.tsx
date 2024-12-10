"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Category, Product } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/actions/cart'
import { ShoppingCart } from 'lucide-react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useRouter } from 'next/navigation'


export function ProductCard({ product }: {product: Product & { category: Category }}) {
  const user = useCurrentUser()
  const router = useRouter()
  const callbackUrl = encodeURIComponent(`/store/products/${product.productId}`)

  const AddItemToCart = () => {
    if (!user) {
      router.push(`/auth/signin?callbackUrl=${callbackUrl}`)
      return
    }
    addToCart(product.productId)
    router.push('/store/cart')
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/store/products/${product.productId}`}>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4">
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            {product.reduction && product.reduction > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-muted-foreground">XAF {(product.price - (product.price * product.reduction / 100)).toFixed(2)}</span>
                <Badge variant="success">save {product.reduction}%</Badge>
              </div>
            ):(
              <span className="text-xl font-semibold text-muted-foreground">XAF {product.price.toFixed(2)}</span>
            )}
            <div className="flex items-center justify-between w-full gap-2">
              <Badge variant="secondary">{product.category.name}</Badge>
              <Button size="icon" onClick={AddItemToCart} className='z-20'>
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}