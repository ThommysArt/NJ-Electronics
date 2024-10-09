"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@prisma/client"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"

export const OrderColumnDef: ColumnDef<Order>[] = [
    {
        accessorKey: "orderId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order ID" />
        ),
        cell: ({ row }) => {
            return <span className="font-medium">{row.original.orderId.slice(0, 8)}</span>
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
]