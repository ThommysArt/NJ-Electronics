"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@prisma/client/edge"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { updateProductAvailability } from "@/actions/products"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { deleteProduct } from "@/actions/products"


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
        accessorKey: "reduction",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reduction" />
          ),
        cell: ({ row }) => {
            const amount = row.original.reduction!.toFixed(2)
            return <p className="flex justify-between text-right font-medium"> {amount}%</p>
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
    },
    {
        header: "Delete",
        cell: ({ row }) => {
            const router = useRouter()

            const deleteThisProduct = async () => {
                const productId = row.original.productId
                try {
                    await deleteProduct(productId)
                    router.refresh()
                } catch {
                    toast({
                        title: "Deletion failed",
                        description: "Failed to delete this product. Please try again!",
                        variant: "destructive"
                    })
                }
                
            }
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" size="icon"><TrashIcon /></Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete the
                                product and remove it from the server.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose><Button variant="outline">Cancel</Button></DialogClose>
                            <Button variant="destructive" onClick={deleteThisProduct}>Continue</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        }
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            const router = useRouter()

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger><DotsVerticalIcon /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={()=>router.push(`/admin/products/${row.original.productId}/update`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>router.push(`/admin/products/${row.original.productId}`)}>View</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]