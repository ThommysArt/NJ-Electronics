import React from 'react'
import { DataTable } from "@/components/ui/data-table"
import { generateOrdersData } from "@/app/admin/_components/fake-data"
import { ColumnFilter } from '@tanstack/react-table'
import { OrderColumnDef } from '@/app/admin/_components/order-column-def'

const OrdersPage = () => {
  const OrdersData = generateOrdersData(100)
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