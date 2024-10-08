'use client'

import { motion } from 'framer-motion'
import { Smartphone, Headphones, Watch, ShoppingCart } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

const categories = [
  { icon: Smartphone, name: 'Smartphones' },
  { icon: Headphones, name: 'Audio Devices' },
  { icon: Watch, name: 'Smartwatches' },
  { icon: ShoppingCart, name: 'Accessories' },
]

export default function CategorySection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
    >
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="bg-card p-6 rounded-lg shadow-md text-center"
        >
          <category.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">{category.name}</h3>
          <p className="text-muted-foreground">Explore our range of {category.name.toLowerCase()}</p>
        </motion.div>
      ))}
    </motion.section>
  )
}

export function CategorySectionSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-card p-6 rounded-lg shadow-md text-center">
          <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-full mx-auto" />
        </div>
      ))}
    </div>
  )
}