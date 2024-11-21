import { getCustomerOrders } from '@/utils/data/orders'
import OrdersList from './_components/orders-list'

export default async function OrdersPage() {
  const orders = await getCustomerOrders()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <OrdersList orders={orders} />
    </div>
  )
}