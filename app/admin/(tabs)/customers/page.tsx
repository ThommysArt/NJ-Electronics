import React from 'react'
import { DataTable } from "@/components/ui/data-table"
import { ColumnFilter } from '@tanstack/react-table'
import { CustomerColumnDef } from '@/app/admin/_components/customer-column-def'
import { getCustomers } from '@/utils/data/customers'

const CustomersPage = async () => {
  const CustomersData = await getCustomers()
  const customFilter: ColumnFilter = { id:"email", value:"Customer Email" }
  return (
    <main className="flex overflow-x-auto max-w-[100vw] pb-20 sm:pb-5">
      <div className="min-w-full">
        <DataTable data={CustomersData} columns={CustomerColumnDef} filter={customFilter}/>
      </div>
    </main>
  )
}

export default CustomersPage