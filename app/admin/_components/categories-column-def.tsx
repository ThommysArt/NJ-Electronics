"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Category } from "@prisma/client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { deleteCategory } from "@/actions/categories"

export const CategoryColumnDef: ColumnDef<Category>[] = [
    {
        accessorKey: "categoryId",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        header: "Delete",
        cell: ({ row }) => {
            const deleteThisCategory = async () => {
                const router = useRouter()
                const categoryId = row.original.categoryId
                try {
                    await deleteCategory(categoryId)
                    router.refresh()
                } catch {
                    toast({
                        title: "Deletion failed",
                        description: "Failed to delete this category. Please try again!",
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
                            <Button variant="destructive" onClick={deleteThisCategory}>Continue</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        }
    }
]