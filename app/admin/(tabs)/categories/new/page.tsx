import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { NewCategoryForm } from './_components/new-category-form'

const NewCategoryPage = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <Card className="max-w-md mx-4 w-full h-fit">
            <CardHeader>
                <CardTitle>New Category</CardTitle>
                <CardDescription>Add a new category to the shop</CardDescription>
            </CardHeader>
            <CardContent>
                <NewCategoryForm />
            </CardContent>
        </Card>
    </div>
  )
}

export default NewCategoryPage