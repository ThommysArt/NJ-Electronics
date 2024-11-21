import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { NewProductForm } from './_components/new-product-form'
import { getAllCategories } from '@/utils/data/categories'

const NewProductPage = async () => {
    const categories = await getAllCategories()
  return (
    <div className="w-full h-full flex justify-center my-24">
        <Card className="max-w-md mx-4 w-full h-fit pb-10">
            <CardHeader>
                <CardTitle>New Product</CardTitle>
                <CardDescription>Add a new product to the shop</CardDescription>
            </CardHeader>
            <CardContent>
                <NewProductForm categories={categories} />
            </CardContent>
        </Card>
    </div>
  )
}

export default NewProductPage