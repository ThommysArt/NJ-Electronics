'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import { BrowserComponent } from '../ui/mock-browser'
import { AspectRatio } from '../ui/aspect-ratio'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <motion.h1
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className="text-5xl font-bold mb-4 text-primary"
      >
        Welcome to NJ Electronics
      </motion.h1>
      <motion.p
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
        className="text-xl text-foreground mb-8"
      >
        Discover the Latest Tech Gadgets for Your Digital Lifestyle
      </motion.p>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
      >
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={()=>router.push("/store")}>
          Shop Now
        </Button>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12"
      >
        <BrowserComponent className="rounded-lg shadow-lg mx-auto h-[250px] w-[360px] md:h-[400px] md:w-[800px] bg-background overflow-hidden">
          <div className="h-full w-full">
            <AspectRatio ratio={16/9} className="h-full">
              <Image
                src="https://utfs.io/f/EAWqchXM7I0KQhzLqWaBg0Nix3YmCKWTJLhG9EFc7f5Ztuyd"
                alt="Latest Tech Gadgets"
                fill
                className='object-cover'
                sizes="(max-width: 768px) 360px, 800px"
              />
            </AspectRatio>
          </div>
        </BrowserComponent>
      </motion.div>
    </motion.section>
  )
}

export function HeroSkeleton() {
  return (
    <div className="text-center mb-16">
      <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
      <Skeleton className="h-10 w-32 mx-auto mb-12" />
      <Skeleton className="h-[400px] w-full max-w-[800px] mx-auto rounded-lg" />
    </div>
  )
}