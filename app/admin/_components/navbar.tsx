"use client"

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { ArchiveIcon, CodeSandboxLogoIcon, EnvelopeClosedIcon, HomeIcon, LayersIcon, BarChartIcon, PersonIcon } from '@radix-ui/react-icons'

export const Navbar = () => {
  const isLarge = useMediaQuery('(min-width: 768px)')
  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    { name: "Dashboard", link: "/admin/dashboard", icon: HomeIcon },
    { name: "Products", link: "/admin/products", icon: CodeSandboxLogoIcon },
    { name: "Categories", link: "/admin/categories", icon: LayersIcon },
    { name: "Orders", link: "/admin/orders", icon: ArchiveIcon },
    { name: "Customers", link: "/admin/customers", icon: PersonIcon },
    { name: "Messages", link: "/admin/messages", icon: EnvelopeClosedIcon },
    { name: "Analytics", link: "/admin/analytics", icon: BarChartIcon },
  ]
  return (
    <TooltipProvider>
      {isLarge===true?(
        <nav className={cn(
          "fixed flex gap-3 z-40 backdrop-blur-sm items-center",
          "flex-col border-r py-10 px-1 h-screen w-14 left-0"
        )}>
          {routes.map((route) => (
            <Tooltip key={route.name}>
              <TooltipTrigger asChild>
                <Button
                  variant={pathname.includes(route.link) ? "default" : "ghost"}
                  onClick={() => router.push(route.link)}
                  size="icon"
                >
                  <route.icon className='w-5 h-5'/>
                </Button>
              </TooltipTrigger>
              <TooltipContent side={isLarge ? "right" : "top"}>
                <p>{route.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      ):(
        <nav className={cn(
          "fixed flex gap-3 z-40 backdrop-blur-sm items-center",
          "flex-row border-t px-3 py-1 h-14 w-screen bottom-0 justify-center"
        )}>
          {routes.map((route) => (
            <Tooltip key={route.name}>
              <TooltipTrigger asChild>
                <Button
                  variant={pathname.includes(route.link) ? "default" : "ghost"}
                  onClick={() => router.push(route.link)}
                  size="icon"
                >
                  <route.icon className='w-5 h-5'/>
                </Button>
              </TooltipTrigger>
              <TooltipContent side={isLarge ? "right" : "top"}>
                <p>{route.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      )}
    </TooltipProvider>
  )
}
