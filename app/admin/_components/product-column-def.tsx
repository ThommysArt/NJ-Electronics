"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@prisma/client/edge"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { updateProductAvailability } from "@/actions/products"


export const ProductColumnDef: ColumnDef<Product>[] = [
    {
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => {
            const imagesUrl = row.original.images[0]
            return (
                <Image
                    src={imagesUrl}
                    alt="N/A"
                    width={30}
                    height={30}
                    className="object-center rounded border border-neutral-200 dark:border-neutral-800"
                    />
            )
        }
    },
    {
        id: "name",
        accessorKey: "name",
        header: "Name"
    },

    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
          ),
        cell: ({ row }) => {
            const amount = row.original.price.toFixed(2)
            return <p className="flex justify-between text-right font-medium">XAF {amount}</p>
        },
    },
    {
        accessorKey: "isAvailable",
        header: "Available",
        cell: ({ row }) => {
            const isAvailable = row.original.isAvailable
            const [ available, setAvailable ] = React.useState<boolean>(isAvailable)

            const changeAvailbility = async (e: boolean) => {
                setAvailable(e)
                updateProductAvailability(row.original.productId, available)
            }

            return (
                <Switch checked={available} onCheckedChange={(e)=>changeAvailbility(e)} />
            )
        }
    }
]