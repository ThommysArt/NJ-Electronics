"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { User } from "@prisma/client"
import Image from "next/image"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export const CustomerColumnDef: ColumnDef<User>[] = [
    {
        accessorKey: "image",
        header: "Avatar",
        cell: ({ row }) => {
            const imageUrl = row.original.image
            return (
                <Image
                    src={imageUrl || '/default-avatar.png'}
                    alt="Avatar"
                    width={30}
                    height={30}
                    className="rounded-full"
                />
            )
        }
    },
    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Joined" />
        ),
        cell: ({ row }) => {
            return new Date(row.original.createdAt).toLocaleDateString()
        },
    },
]