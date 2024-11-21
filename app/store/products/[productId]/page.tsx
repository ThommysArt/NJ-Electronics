import { notFound } from 'next/navigation'
import { getProductById } from '@/utils/data/products'
import ProductDetails from './_components/product-details'

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await getProductById(params.productId)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}