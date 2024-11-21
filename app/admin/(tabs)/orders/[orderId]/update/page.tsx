import React from 'react'
import { OrderUpdatePage } from './_components/update-order-page'
import { getOrderById } from '@/utils/data/orders'
import { notFound } from 'next/navigation'

const UpdatePage = async ({params}: {params: {orderId: string}}) => {
    const my_order = await getOrderById(params.orderId)
    if (!my_order) {
        return notFound()
    }
  return (
    <OrderUpdatePage my_order={my_order}/>
  )
}

export default UpdatePage