import { Metadata } from 'next'
import { generateOgImage } from '@/lib/og-image'
import { getCustomerOrders } from '@/utils/data/orders'
import OrdersList from './_components/orders-list'

export const metadata: Metadata = {
  title: 'Your Orders',
  description: 'View and manage your orders from NJ Electronics',
  openGraph: {
    title: 'Your Orders | NJ Electronics',
    description: 'View and manage your orders from NJ Electronics',
    images: [{ url: generateOgImage('Your Orders', 'View and manage your orders from NJ Electronics') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Orders | NJ Electronics',
    description: 'View and manage your orders from NJ Electronics',
    images: [generateOgImage('Your Orders', 'View and manage your orders from NJ Electronics')],
  },
}

export default async function OrdersPage() {
  const orders = await getCustomerOrders()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <OrdersList orders={orders} />
    </div>
  )
}