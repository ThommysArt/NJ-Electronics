'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from 'framer-motion'

type Chat = {
  chatId: string
  userId: string
  userName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export function ChatList({ initialChats }: { initialChats: Chat[] }) {
  const [chats, setChats] = useState<Chat[]>(initialChats)

  useEffect(() => {
    // TODO: Implement real-time updates for chats
  }, [])

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-4">
        {chats.map((chat, index) => (
          <motion.div
            key={chat.chatId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/admin/messages/${chat.chatId}`}>
              <div className="flex items-center space-x-4 cursor-pointer hover:bg-accent rounded-lg p-3">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.userName}`} />
                  <AvatarFallback>{chat.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold truncate">{chat.userName}</h3>
                    <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  )
}