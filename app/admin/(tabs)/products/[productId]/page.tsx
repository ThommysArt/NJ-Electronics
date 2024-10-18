import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { DollarSign } from 'lucide-react'
import { getProductById } from '@/utils/data/products'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ProductPage = async ({params}: {params: {productId: string}}) => {
    const product = await getProductById(params.productId)
    if (!product) {
        return notFound()
    }
  return (
    <div className="w-full h-full flex justify-center">
        <Card className="max-w-md mx-4 w-full h-fit">
            <CardHeader className="bg-muted/20">
                <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
                <div className="flex items-center justify-between mt-2 text-lg">
                    <Badge variant="secondary">{product.category.name}</Badge>
                    <div className="flex items-center mt-2 text-lg">
                        <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                        <span className="font-semibold text-2xl">{product.price.toFixed(2)}</span>
                        <Badge variant="destructive">-{product.reduction}%</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold">Description</h2>
                    <Separator className="my-2" />
                    <p>
                        {product.description}
                    </p>
                </div>
                <Badge>{product.units} Units</Badge>
                <div className="px-8 md:px-0">
                    <h2 className="text-xl font-semibold mb-4">Service Images</h2>
                    <Carousel className="w-full max-w-[75vw]">
                        <CarouselContent>
                        {product.images.map((image, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="aspect-video relative">
                                <Image
                                src={image}
                                alt={`Event image ${index + 1}`}
                                height={300}
                                width={300}
                                objectFit="cover"
                                className="rounded-lg"
                                />
                            </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </CardContent>
            <CardFooter className="flex border-t bg-muted/20">
                <span className="text-muted-foreground text-sm">@NJ-Electronics</span>
                <Link href={`/admin/products/${product.productId}/update`}>
                    <Button>
                        Update
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default ProductPage