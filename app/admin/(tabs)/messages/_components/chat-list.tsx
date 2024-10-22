"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Chat, User } from "@prisma/client"


export const ChatList = ({chats}: {chats: (Chat & { user: User })[]}) => {
    const pathname = usePathname()
    const router = useRouter()
    if (pathname==="/admin/messages") router.push(`/admin/messages/${chats[0]?.chatId}`)

    return (
        <ScrollArea className="h-[calc(100vh-4rem)]">
        {chats.map(chat => (
            <Link key={chat.chatId} href={`/admin/messages/${chat.chatId}`}>
            <div className={`p-4 border-b hover:bg-accent cursor-pointer ${pathname.includes(chat.chatId) ? 'bg-accent' : ''}`}>
                <h2 className="font-semibold">{chat.user.name||chat.user.email}</h2>
                <p className="text-xs text-muted-foreground">
                {chat.updatedAt instanceof Date ? chat.updatedAt.toLocaleString() : ''}
                </p>
            </div>
            </Link>
        ))}
        </ScrollArea>
    )
}