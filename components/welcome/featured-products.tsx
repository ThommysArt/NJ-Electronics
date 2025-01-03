'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from '../ui/aspect-ratio'
import { useRouter } from 'next/navigation'

const products = [
  { name: 'Latest Smartphone', price: 'XAF 210000', image: 'https://utfs.io/f/EAWqchXM7I0K4d1cCBTR1cpQgUuSaXsvtjiOT42GImz8F9fW' },
  { name: 'Wireless Earbuds', price: 'XAF 40000', image: 'https://utfs.io/f/EAWqchXM7I0KcFJHdebAZQRuvDTKgLpF1MXJqYiBwxO5Ssh6' },
  { name: 'Smart Watch', price: 'XAF 60000', image: 'https://utfs.io/f/EAWqchXM7I0KcFJHdebAZQRuvDTKgLpF1MXJqYiBwxO5Ssh6' },
]

export default function FeaturedProducts() {
  const router = useRouter()
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <motion.h2
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="text-3xl font-bold mb-8 text-primary"
      >
        Featured Products
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card p-6 rounded-lg shadow-md"
          >
            <AspectRatio ratio={1/1}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-md"
              />
            </AspectRatio>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{product.name}</h3>
            <p className="text-muted-foreground mb-4">{product.price}</p>
            <Button variant="outline" onClick={()=>router.push(`/store`)}>Add to Cart</Button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export function FeaturedProductsSkeleton() {
  return (
    <div className="text-center mb-16">
      <Skeleton className="h-10 w-64 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-card p-6 rounded-lg shadow-md">
            <Skeleton className="h-[300px] w-full mb-4 rounded-md" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-10 w-32 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}