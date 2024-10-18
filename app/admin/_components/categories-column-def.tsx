"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Category } from "@prisma/client"

export const CategoryColumnDef: ColumnDef<Category>[] = [
    {
        accessorKey: "categoryId",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    }
]