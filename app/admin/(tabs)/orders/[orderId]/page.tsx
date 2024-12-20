import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
    Table, 
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeader
} from '@/components/ui/table'
import { CheckIcon, ChevronLeftIcon, Cross1Icon, ChevronRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { getOrderById } from '@/utils/data/orders'
import { notFound } from 'next/navigation'

const OrderViewPage = async ({params}: {params: {orderId: string}}) => {
    const my_order = await getOrderById(params.orderId)
    if (!my_order) {
        return notFound()
    }
    return (
        <div>
            <Card className="overflow-hidden m-4 max-w-md pb-10">
                <CardHeader className="bg-muted/50">
                        <CardTitle className="text-lg font-bold">
                            Order {params.orderId}
                        </CardTitle>
                        <CardDescription>Date: {my_order.updatedAt.toDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className='grid gap-4'>
                        <div className='flex flex-col gap-2'>
                            <h3 className="text-md font-semibold mb-4">Customer Information</h3>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-sm font-normal">Full Name</TableCell>
                                        <TableCell className="text-sm font-normal text-muted-foreground">{my_order.paymentName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-sm font-normal">Phone Number</TableCell>
                                        <TableCell className="text-sm font-normal text-muted-foreground">{my_order.paymentPhone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-sm font-normal">Delivery Address</TableCell>
                                        <TableCell className="text-sm font-normal text-muted-foreground">{my_order.deliveryLocation}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <Separator />
                        <div className='flex flex-col gap-2'>
                            <h3 className="text-md font-semibold mb-4">Order Details</h3>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-sm font-normal">Cart Id</TableCell>
                                        <TableCell className="text-sm font-normal text-muted-foreground">{my_order.cartId}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-sm font-normal">Total Amount</TableCell>
                                        <TableCell className="text-sm font-normal text-muted-foreground">XAF {my_order.amount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <Separator />
                        <div className='flex flex-col gap-2'>
                            <h3 className="text-md font-semibold mb-4">Products</h3>
                            <Table>
                                <TableBody>
                                    <TableHeader className='w-full'>
                                        <TableRow className="w-full">
                                            <TableHead>Product</TableHead>
                                            <TableHead>Units</TableHead>
                                            <TableHead>Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    {my_order.cart.cartItems.map((cartItem, idx)=>(
                                        <TableRow key={idx}>
                                            <TableCell className="text-sm font-normal">{cartItem.product.name}</TableCell>
                                            <TableCell className="text-sm font-normal text-muted-foreground">{cartItem.units}</TableCell>
                                            <TableCell className="text-sm font-normal text-muted-foreground">XAF {cartItem.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <Separator />
                        <div className='flex flex-col gap-2'>
                            <h3 className="text-md font-semibold mb-4">Status</h3>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-sm font-normal">Paid</TableCell>
                                        <TableCell className="text-sm font-normal text-muted-foreground">
                                            <Badge variant={my_order.isPaid===true?"secondary":"destructive"}>
                                                {my_order.isPaid===true?(<CheckIcon/>):(<Cross1Icon/>)}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-sm font-normal">Delivered</TableCell>
                                        <TableCell className="text-sm font-normal text-muted-foreground">
                                            <Badge variant={my_order.isDelivered===true?"secondary":"destructive"}>
                                                {my_order.isDelivered===true?(<CheckIcon/>):(<Cross1Icon/>)}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3">
                    <Button variant="outline" className="flex flex-row gap-2">
                        <ChevronLeftIcon /><Link href="/admin/orders">Go Back</Link>
                    </Button>
                    <Button className="flex flex-row gap-2">
                        <Link href={`/admin/orders/${params.orderId}/update`}>update</Link><ChevronRightIcon />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default OrderViewPage