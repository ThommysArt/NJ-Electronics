'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from '../theme-switcher'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed top-0 container mx-auto px-4 py-4 flex justify-between items-center border-b backdrop-blur-sm z-50"
    >
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-10 h-10">
          <Image src="/logo.svg" alt="NJ Electronics Logo" width={40} height={40} className="rounded-md border" />
        </div>
        <span className="text-2xl font-bold text-primary">NJ Electronics</span>
      </Link>
      <div className="flex gap-3">
        <ThemeSwitcher />
        <Button onClick={()=>router.push("auth/sign-up")}>
          Sign Up
        </Button>
      </div>
    </motion.header>
  )
}