import { Metadata } from 'next'
import Link from 'next/link'
import { getProductsAndCategories } from '@/utils/data/products'
import { ProductCard } from './_components/product-card'
import { Button } from "@/components/ui/button"
import { generateOgImage } from '@/lib/og-image'

export const metadata: Metadata = {
  title: 'NJ Electronics - Store',
  description: 'Discover the latest electronics and gadgets at NJ Electronics',
  openGraph: {
    title: 'NJ Electronics - Store',
    description: 'Discover the latest electronics and gadgets at NJ Electronics',
    images: [{ url: generateOgImage('NJ Electronics', 'Discover the latest electronics and gadgets') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NJ Electronics - Store',
    description: 'Discover the latest electronics and gadgets at NJ Electronics',
    images: [generateOgImage('NJ Electronics', 'Discover the latest electronics and gadgets')],
  },
}

export default async function StorePage({ searchParams }: { searchParams: { category?: string } }) {
  const { products, categories } = await getProductsAndCategories(searchParams.category)

  return (
    <div className="container mx-auto py-6">
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <Button
          variant={!searchParams.category ? "default" : "outline"}
          asChild
        >
          <Link href="/store">All</Link>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.categoryId}
            variant={searchParams.category === category.name ? "default" : "outline"}
            asChild
          >
            <Link href={`/store?category=${category.name}`}>{category.name}</Link>
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