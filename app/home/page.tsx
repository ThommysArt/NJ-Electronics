import { Suspense } from 'react'
import Link from 'next/link'
import { getProductsAndCategories } from '@/actions/products'
import { SearchBar } from './_components/search-bar'
import { ProductCard } from './_components/product-card'
import { Button } from "@/components/ui/button"

export default async function HomePage({ searchParams }: { searchParams: { category?: string } }) {
  const { products, categories } = await getProductsAndCategories(searchParams.category)

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">NJ Electronics</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar products={products} categories={categories} />
        </Suspense>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <Button
          variant={!searchParams.category ? "default" : "outline"}
          asChild
        >
          <Link href="/home">All</Link>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.categoryId}
            variant={searchParams.category === category.name ? "default" : "outline"}
            asChild
          >
            <Link href={`/home?category=${category.name}`}>{category.name}</Link>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  )
}