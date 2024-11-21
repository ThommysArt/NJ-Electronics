import Link from 'next/link'
import { getProductsAndCategories } from '@/utils/data/products'
import { ProductCard } from './_components/product-card'
import { Button } from "@/components/ui/button"

export default async function HomePage({ searchParams }: { searchParams: { category?: string } }) {
  const { products, categories } = await getProductsAndCategories(searchParams.category)

  return (
    <div className="container mx-auto py-6">
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