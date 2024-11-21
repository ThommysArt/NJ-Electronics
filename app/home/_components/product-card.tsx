"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Category, Product } from '@prisma/client'


export function ProductCard({ product }: {product: Product & { category: Category }}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/home/product/${product.productId}`}>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <Image
                src={product.images[0]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4">
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-muted-foreground mb-2">XAF {product.price}</p>
            <Badge variant="secondary">{product.category.name}</Badge>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}