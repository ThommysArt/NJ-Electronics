'use client'

import { useState, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Send, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import io, { Socket } from 'socket.io-client'

type Message = {
  messageId: string
  text: string
  files: string[]
  createdAt: string
  isFromClient: boolean
}

type Chat = {
  chatId: string
  userId: string
  userName: string
}

export function ChatView({ initialChat, initialMessages }: { initialChat: Chat, initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:9090') // Replace with your socket server URL
    setSocket(newSocket)

    newSocket.on('connect', () => {
      console.log('Connected to socket server')
      newSocket.emit('join', initialChat.chatId)
    })

    newSocket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      newSocket.disconnect()
    }
  }, [initialChat.chatId])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() || files.length > 0) {
      const message: Partial<Message> = {
        text: newMessage,
        files: [],
        isFromClient: false,
      }

      if (socket) {
        socket.emit('message', { chatId: initialChat.chatId, message })
      }

      setNewMessage('')
      setFiles([])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="p-4 border-b flex items-center space-x-4">
        <Link href="/admin/messages" className="md:hidden">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${initialChat.userName}`} />
          <AvatarFallback>{initialChat.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{initialChat.userName}</h2>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.messageId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.isFromClient ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.isFromClient
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <p>{message.text}</p>
                {message.files.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4" />
                        <span className="text-sm">{file}</span>
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-xs opacity-50 mt-1 block">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2 items-center">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Paperclip className="w-6 h-6" />
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <Button onClick={handleSendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {files.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-semibold">Selected files:</p>
            <ul className="text-sm">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}