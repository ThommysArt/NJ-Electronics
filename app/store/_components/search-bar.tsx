"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Package, Tag } from 'lucide-react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Category, Product } from "@prisma/client"


type SearchBarProps = {
  products: Product[]
  categories: Category[]
}

export function SearchBar({ products, categories }: SearchBarProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()

  const results = React.useMemo(() => {
    if (query.length === 0) return { products: [], categories: [] }

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    )

    return { products: filteredProducts, categories: filteredCategories }
  }, [query, products, categories])

  const handleSelectProduct = (result: Product) => {
    setOpen(false)
    router.push(`/store/products/${result.productId}`)
    }

  const handleSelectCategory = (result: Category) => {
    setOpen(false)
    router.push(`/store?category=${result.name}`)
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="hidden sm:flex text-muted-foreground font-normal justify-between space-x-4 bg-neutral-100 dark:bg-neutral-900 hover:border-stone-700"
      >
        <MagnifyingGlassIcon className="mr-2" />
        Search products...
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="sm:hidden text-muted-foreground font-normal bg-neutral-100 dark:bg-neutral-900 hover:border-stone-700"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products or categories..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {results.products.length > 0 && (
            <CommandGroup heading="Products">
              {results.products.map((result) => (
                <CommandItem key={result.productId} onSelect={() => handleSelectProduct(result)}>
                  <Package className="mr-2 h-4 w-4" />
                  <span>{result.name}</span>
                  {result.price && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      XAF {result.price}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {results.categories.length > 0 && (
            <CommandGroup heading="Categories">
              {results.categories.map((result) => (
                <CommandItem key={result.categoryId} onSelect={() => handleSelectCategory(result)}>
                  <Tag className="mr-2 h-4 w-4" />
                  <span>{result.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}