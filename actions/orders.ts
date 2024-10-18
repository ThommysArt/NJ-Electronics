import { prisma } from "@/prisma/connection";
import { Order } from "@prisma/client";

export const updateOrder = async (order: Order) => {
    try {
        return await prisma.order.update({
            where: { orderId: order.orderId },
            data: order
        })
    } catch (error) {
        return null
    }
}