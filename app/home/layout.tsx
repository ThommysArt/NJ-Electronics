import React from 'react'
import { Suspense } from 'react'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchBar } from './_components/search-bar'
import { getProductsAndCategories } from '@/utils/data/products'

const HomeLayout = async ({children}: {children: React.ReactNode}) => {
    const { products, categories } = await getProductsAndCategories()
  return (
    <div className="flex flex-col gap-4 p-0">
        <div className="flex justify-between items-center border-b px-4 md:px-8 py-3">
            <h1 className="text-2xl md:text-3xl font-bold">NJ Electronics</h1>
            <div className="flex justify-end items-center gap-2">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchBar products={products} categories={categories} />
            </Suspense>
            <Link href="/home/cart">
                <Button variant="outline" size="icon">
                <ShoppingCartIcon className="w-5 h-5" />
                </Button>
            </Link>
            </div>
        </div>
        {children}
    </div>
  )
}

export default HomeLayout