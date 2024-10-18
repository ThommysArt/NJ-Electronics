import React from 'react'
import { DataTable } from "@/components/ui/data-table"
import { ColumnFilter } from '@tanstack/react-table'
import { ProductColumnDef } from '@/app/admin/_components/product-column-def'
import { getAllProducts } from '@/actions/products'

const ProductsPage = async  () => {
  const ProductsData = await getAllProducts()
  const customFilter: ColumnFilter = { id:"name", value:"Product Name" }
  return (
    <main className="flex overflow-x-auto max-w-[100vw] pb-20 sm:pb-5">
      <div className="min-w-full">
        <DataTable data={ProductsData} columns={ProductColumnDef} filter={customFilter}/>
      </div>
    </main>
  )
}

export default ProductsPage