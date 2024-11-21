'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { addToCart } from '@/actions/cart'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

type ProductDetailsProps = {
  product: {
    productId: string
    name: string
    description: string
    price: number
    images: string[]
    category: { name: string }
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center mx-auto py-8 px-4 max-w-3xl md:min-w-3xl gap-6"
    >
      <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
      <div className="flex flex-col gap-8 justify-center">
        <div className="flex w-full mx-auto justify-center">
          <Carousel className="flex justify-center max-w-sm mx-auto relative">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                    <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={450}
                    height={450}
                    className="object-cover rounded-lg aspect-square"
                    />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-10 right-14 flex gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
            <Badge variant="secondary">{product.category.name}</Badge>
          </motion.div>
          <Separator />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-3">Description</h2>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <form action={addToCart}>
              <input type="hidden" name="productId" value={product.productId} />
              <Button type="submit">
                Add to Cart
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}