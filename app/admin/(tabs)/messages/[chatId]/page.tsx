'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useCurrentUser } from '@/hooks/use-current-user'

type Message = {
  id: string
  text: string
  files: string[]
  createdAt: Date
  isFromClient: boolean
}

export default function ChatPage() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const user = useCurrentUser()

  useEffect(() => {
    if (!user || !chatId) return

    const q = query(collection(db, `chats/${chatId}/messages`), orderBy('createdAt', 'asc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages: Message[] = []
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() } as Message)
      })
      setMessages(fetchedMessages)
    })

    return () => unsubscribe()
  }, [chatId, user])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!user || !chatId) return
    if (newMessage.trim() || files.length > 0) {
      const message = {
        text: newMessage,
        files: [],
        createdAt: serverTimestamp(),
        isFromClient: false,
        userId: user.id,
      }

      try {
        await addDoc(collection(db, `chats/${chatId}/messages`), message)
        setNewMessage('')
        setFiles([])
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  if (!user) {
    return <div className="p-4">Please sign in to view messages.</div>
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.isFromClient ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.isFromClient
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <p>{message.text}</p>
                {message.files && message.files.length > 0 && (
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
                  {message.createdAt instanceof Date ? message.createdAt.toLocaleTimeString() : ''}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button variant="outline" size="icon" className="shrink-0">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Paperclip className="w-4 h-4" />
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </Button>
          <Button onClick={handleSendMessage} className="shrink-0">
            <Send className="w-4 h-4 mr-2" />
            Send
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