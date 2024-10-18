'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import { MultiImageUpload } from '@/components/multi-image-upload'
import { ProductSchema } from '@/constants/zod'
import { Category, Product } from '@prisma/client'
import { BeatLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'
import {  updateProduct } from '@/actions/products'


export function UpdateProductForm({product, categories}: {product: Product, categories: Category[]}) {
    const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      reduction: product.reduction!,
      units: product.units,
      images: product.images,
      categoryId: product.categoryId,
    },
  })

  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    setError("")
    setSuccess("")
    setIsSubmitting(true)
    try {
        setIsSubmitting(true)
        await updateProduct(product.productId, values)
        setSuccess("Product updated successfully")
        setIsSubmitting(false)
        router.push('/admin/products')
        router.refresh()
    } catch (error) {
        setError("Failed to update product")
        setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {categories.map(category => (
                        <SelectItem key={category.categoryId} value={category.categoryId}>{category.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="reduction"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Reduction (%)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="Enter reduction percentage" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="units"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Units</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="Enter number of units" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <MultiImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    maxFiles={5}
                    />
              </FormControl>
              <FormDescription>Upload up to 5 images for your service.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <RocketIcon className="h-6 w-6"/>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <BeatLoader /> : "Submit"}
        </Button>
      </form>
    </Form>
  )
}