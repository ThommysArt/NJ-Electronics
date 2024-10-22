import React, { Suspense } from 'react'
import { DataTable } from "@/components/ui/data-table"
import { ColumnFilter } from '@tanstack/react-table'
import { CategoryColumnDef } from '../../_components/categories-column-def'
import { getAllCategories } from '@/utils/data/categories'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CategoriesPage = async () => {
    const categoriesData = await getAllCategories()
    const customFilter: ColumnFilter = { id:"name", value:"Product Name" }
    return (
      <main className="flex flex-col overflow-x-auto max-w-[100vw] pb-20 sm:pb-5">
        <div className="min-w-full">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
                <DataTable data={categoriesData} columns={CategoryColumnDef} filter={customFilter}/>
            </Suspense>
        </div>
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle>Categories</CardTitle>
            <CardDescription className="text-balance max-w-lg leading-relaxed">
              Add New categories to the shop
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button><Link href="/admin/categories/new">Add Category</Link></Button>
          </CardFooter>
        </Card>
      </main>
    )
}

export default CategoriesPage