"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { User } from "@prisma/client"
import Image from "next/image"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Button } from "@/components/ui/button"
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { makeAdmin, removeAdmin } from "@/actions/customers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const CustomerColumnDef: ColumnDef<User>[] = [
    {
        accessorKey: "image",
        header: "Avatar",
        cell: ({ row }) => {
            const imageUrl = row.original.image
            return (
                <Avatar>
                    <AvatarImage src={imageUrl!} />
                    <AvatarFallback>{row.original.email.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
            )
        }
    },
    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
            <h6>{row.original.name || "N/A"}</h6>
        )
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
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        header: "More",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button size="icon" variant="ghost"><DotsVerticalIcon /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => makeAdmin(row.original.id)}>Make Admin</DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => removeAdmin(row.original.id)}>Remove Admin</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
            )
        }
    }
]