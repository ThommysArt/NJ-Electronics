"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@prisma/client"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

export const OrderColumnDef: ColumnDef<Order>[] = [
    {
        accessorKey: "paymentName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment Name" />
        ),
        cell: ({ row }) => {
            return <span className="font-medium">{row.original.paymentName}</span>
        }
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => {
            return <span>XAF {row.original.amount.toFixed(2)}</span>
        }
    },
    {
        accessorKey: "paymentMethod",
        header: "Payment Method",
    },
    {
        accessorKey: "isPaid",
        header: "Payment Status",
        cell: ({ row }) => {
            return (
                <Badge variant={row.original.isPaid ? "success" : "destructive"}>
                    {row.original.isPaid ? "Paid" : "Unpaid"}
                </Badge>
            )
        }
    },
    {
        accessorKey: "isDelivered",
        header: "Delivery Status",
        cell: ({ row }) => {
            return (
                <Badge variant={row.original.isDelivered ? "success" : "warning"}>
                    {row.original.isDelivered ? "Delivered" : "Pending"}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order Date" />
        ),
        cell: ({ row }) => {
            return new Date(row.original.createdAt).toLocaleDateString()
        },
    },
    {
        header: "More",
        cell: ({ row }) => {
            const router = useRouter()

            return (
                <Button size="icon" onClick={()=>router.push(`/admin/orders/${row.original.orderId}`)}>
                    <DotsVerticalIcon />
                </Button>
            )
        }
    }
]