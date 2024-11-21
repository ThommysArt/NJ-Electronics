"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
    Table, 
    TableBody,
    TableRow,
    TableCell
} from '@/components/ui/table'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { updateOrder } from '@/actions/orders'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { BeatLoader } from 'react-spinners'
import { Order, Cart, CartItem, Product } from '@prisma/client'

interface MyOrderInterface extends Order {
    cart: Cart & {
        cartItems: (CartItem & {
            product: Product
        })[]
    }
}

export const OrderUpdatePage = ({my_order}: {my_order: MyOrderInterface}) => {
    const [ loading, setLoading ] = useState(false)
    const [ paymentStatus, setPaymentStatus ] = useState<boolean>(false)
    const [ deliveryStatus, setDeliveryStatus ] = useState<boolean>(false)
    const router = useRouter()

    useEffect(()=>{
        setPaymentStatus(my_order.isPaid)
        setDeliveryStatus(my_order.isDelivered)
    }, [])

    const handleUpdate = async () => {
        setLoading(true)
        try {
            const order = await updateOrder({
                ...my_order, 
                isDelivered: deliveryStatus,
                isPaid: paymentStatus
            })
            if (!order) {
                toast({
                    title: "Error occured",
                    description: "Failed to update Order. Please try again!",
                    variant: "destructive"
                })
            }
            toast({
                title: "Update Successful",
                description: "The order was successfully updated"
            })
            router.push(`/admin/orders/${my_order.orderId}`)
            router.refresh()
        } catch (error) {
            toast({
                title: "Error occured",
                description: "Failed to update Order. Please try again!",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <Card className="overflow-hidden max-w-md m-4" >
                    <CardHeader className="bg-muted/50">
                            <CardTitle className="text-lg font-bold">
                                Order {my_order.orderId}
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
                                <h3 className="text-md font-semibold mb-4">Status</h3>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-sm font-normal">Paid</TableCell>
                                            <TableCell className="text-sm font-normal text-muted-foreground">
                                                <Switch checked={paymentStatus} onCheckedChange={(e)=>setPaymentStatus(e)}/>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-sm font-normal">Delivered</TableCell>
                                            <TableCell className="text-sm font-normal text-muted-foreground">
                                                <Switch checked={deliveryStatus} onCheckedChange={(e)=>setDeliveryStatus(e)}/>
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
                        <Button type="submit">
                            {loading ? <BeatLoader /> : "Save"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
