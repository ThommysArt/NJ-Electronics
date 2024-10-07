"use client"
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import { ArchiveIcon, CodeSandboxLogoIcon, HomeIcon, MixerVerticalIcon, PersonIcon } from '@radix-ui/react-icons'

export const Navbar = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    { name: "Dashboard", link: "/admin/dashboard", icon: HomeIcon },
    { name: "Products", link: "/admin/products", icon: CodeSandboxLogoIcon },
    { name: "Orders", link: "/admin/orders", icon: ArchiveIcon },
    { name: "Customers", link: "/admin/customers", icon: PersonIcon },
    { name: "Analytics", link: "/admin/analytics", icon: MixerVerticalIcon },
  ]
  return (
    <nav>
      <div className={cn(
        "fixed flex gap-3 z-40 backdrop-blur-sm",
        isDesktop
          ? "flex-col border-r py-3 px-1 h-screen w-14 left-0"
          : "flex-row border-t px-3 py-1 h-14 w-screen bottom-0"
      )}>
        {routes.map((route)=> (
          <Button
            variant={pathname.includes(route.link)?"default":"ghost"}
            onClick={()=>router.push(route.link)}
            size="icon"
            >
              <route.icon />
          </Button>
        ))}
      </div>
    </nav>
  )
}
