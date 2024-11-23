import { MetadataRoute } from 'next'
import { prisma } from '@/prisma/connection'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nj-electronics.vercel.app'

  // Fetch all products
  const products = await prisma.product.findMany({
    select: { productId: true, updatedAt: true },
  })

  // Fetch all categories
  const categories = await prisma.category.findMany({
    select: { name: true, createdAt: true },
  })

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/store/product/${product.productId}`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/store?category=${encodeURIComponent(category.name)}`,
    lastModified: category.createdAt,
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/store/orders`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...productUrls,
    ...categoryUrls,
  ]
}