import React from 'react'
import { DataTable } from "@/components/ui/data-table"
import { generateCustomersData } from "@/app/admin/_components/fake-data"
import { ColumnFilter } from '@tanstack/react-table'
import { CustomerColumnDef } from '@/app/admin/_components/customer-column-def'

const CustomersPage = () => {
  const CustomersData = generateCustomersData(50)
  const customFilter: ColumnFilter = { id:"name", value:"Customer Name" }
  return (
    <main className="flex overflow-x-auto max-w-[100vw] pb-20 sm:pb-5">
      <div className="min-w-full">
        <DataTable data={CustomersData} columns={CustomerColumnDef} filter={customFilter}/>
      </div>
    </main>
  )
}

export default CustomersPage