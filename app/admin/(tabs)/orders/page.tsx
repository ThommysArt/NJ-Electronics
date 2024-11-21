import React from 'react'
import { DataTable } from "@/components/ui/data-table"
import { ColumnFilter } from '@tanstack/react-table'
import { OrderColumnDef } from '@/app/admin/_components/order-column-def'
import { getAllOrders } from '@/utils/data/orders'

const OrdersPage = async () => {
  const OrdersData = await getAllOrders()
  const customFilter: ColumnFilter = { id:"orderId", value:"Order ID" }
  return (
    <main className="flex overflow-x-auto max-w-[100vw] pb-20 sm:pb-5">
      <div className="min-w-full">
        <DataTable data={OrdersData} columns={OrderColumnDef} filter={customFilter}/>
      </div>
    </main>
  )
}

export default OrdersPage