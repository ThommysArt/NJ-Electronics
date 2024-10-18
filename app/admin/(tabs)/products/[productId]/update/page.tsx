import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { UpdateProductForm } from './_components/update-product-form'
import { getAllCategories } from '@/utils/data/categories'
import { getProductById } from '@/utils/data/products'
import { notFound } from 'next/navigation'

const NewProductPage = async ({params}: {params: {productId: string}}) => {
    const categories = await getAllCategories()
    const product = await getProductById(params.productId)
    if (!product) {
        return notFound()
    }
  return (
    <div className="w-full h-full flex justify-center">
        <Card className="max-w-md mx-4 w-full h-fit">
            <CardHeader>
                <CardTitle>Update Product</CardTitle>
                <CardDescription>Update a product in the shop</CardDescription>
            </CardHeader>
            <CardContent>
                <UpdateProductForm product={product} categories={categories} />
            </CardContent>
        </Card>
    </div>
  )
}

export default NewProductPage