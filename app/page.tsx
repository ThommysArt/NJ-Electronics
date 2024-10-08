import Header from '@/components/welcome/header'
import Hero, { HeroSkeleton } from '@/components/welcome/hero'
import CategorySection, { CategorySectionSkeleton } from '@/components/welcome/category-section'
import FeaturedProducts, { FeaturedProductsSkeleton } from '@/components/welcome/featured-products'
import CTASection, { CTASectionSkeleton } from '@/components/welcome/cta-section'
import Footer from '@/components/welcome/footer'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      <main className="container mx-auto px-4 py-12 mt-20">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection />
        </Suspense>
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
        <Suspense fallback={<CTASectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}