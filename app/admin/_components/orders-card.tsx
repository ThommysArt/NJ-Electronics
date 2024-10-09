"use client"

import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

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
    TableBody,
    TableRow,
    TableCell
} from '@/components/ui/table'
import { 
    CheckIcon, 
    Cross1Icon,
    Pencil2Icon, 
} from '@radix-ui/react-icons'
import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Order } from "@prisma/client"

const OrdersCard = ({orders}: {orders: Order[]}) => {
    const [index, setIndex] = React.useState<number>(0)
    const order = orders[index]
  return (
    <Card className="sm:w-[48vw] h-fit">
        <CardHeader className="bg-muted/50">
                <CardTitle className="text-lg font-bold">
                    Order {order.orderId}
                </CardTitle>
                <CardDescription>Date: {order.createdAt.toDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-sm">
            <div className='grid gap-4'>
                <div className='flex flex-col gap-2'>
                    <h3 className="text-md font-semibold mb-4">Customer Information</h3>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-sm font-normal">Full Name</TableCell>
                                <TableCell className="text-sm font-normal text-muted-foreground">{order.paymentName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-sm font-normal">Phone Number</TableCell>
                                <TableCell className="text-sm font-normal text-muted-foreground">{order.paymentPhone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-sm font-normal">Delivery Address</TableCell>
                                <TableCell className="text-sm font-normal text-muted-foreground">{order.deliveryLocation}</TableCell>
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
                                <TableCell className="text-sm font-normal text-muted-foreground">{order.cartId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-sm font-normal">Total Amount</TableCell>
                                <TableCell className="text-sm font-normal text-muted-foreground">XAF {order.amount}</TableCell>
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
                                    <Badge variant={order.isPaid===true?"secondary":"destructive"}>
                                        {order.isPaid===true?(<CheckIcon/>):(<Cross1Icon/>)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-sm font-normal">Delivered</TableCell>
                                <TableCell className="text-sm font-normal text-muted-foreground">
                                    <Badge variant={order.isDelivered===true?"secondary":"destructive"}>
                                        {order.isDelivered===true?(<CheckIcon/>):(<Cross1Icon/>)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <Button className="flex flex-row space-x-2">
                <Link href={`/admin/orders/${order.orderId}/update`}>Update</Link>
                <Pencil2Icon className="h-4 w-4" />
            </Button>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button 
                    variant="outline" 
                    onClick={()=>{
                        index!==0&&setIndex(index-1)}
                    }>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button 
                    variant="outline" 
                    onClick={()=>{
                        index!==orders.length-1&&setIndex(index+1)}
                    }>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
  )
}

export default OrdersCard