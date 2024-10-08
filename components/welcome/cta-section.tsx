'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from 'next/navigation'

export default function CTASection() {
  const router = useRouter()
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary text-primary-foreground p-12 rounded-lg mb-16"
    >
      <motion.h2
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="text-3xl font-bold mb-4"
      >
        Upgrade Your Tech Game Today!
      </motion.h2>
      <motion.p
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
        className="mb-6"
      >
        Don't miss out on our latest deals and cutting-edge gadgets. Visit our store now!
      </motion.p>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
      >
        <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90" onClick={()=>router.push("/store")}>
          Visit Our Store
        </Button>
      </motion.div>
    </motion.section>
  )
}

export function CTASectionSkeleton() {
  return (
    <div className="bg-primary p-12 rounded-lg mb-16">
      <Skeleton className="h-10 w-3/4 mb-4 bg-primary-foreground/20" />
      <Skeleton className="h-6 w-full mb-6 bg-primary-foreground/20" />
      <Skeleton className="h-12 w-40 bg-primary-foreground/20" />
    </div>
  )
}