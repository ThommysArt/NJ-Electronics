"server only"

import { currentUser } from '@/lib/auth'
import { prisma } from '@/prisma/connection'

export async function getChats() {
  const chats = await prisma.chat.findMany({
    include: {
      user: true,
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  return chats.map(chat => ({
    chatId: chat.chatId,
    userId: chat.userId,
    userName: chat.user.name || 'Unknown User',
    lastMessage: chat.messages[0]?.text || '',
    lastMessageTime: chat.messages[0]?.createdAt.toISOString() || '',
    unreadCount: chat.messages.filter(m => !m.isRead && m.isFromClient).length
  }))
}

export async function getChat(chatId: string) {
  const chat = await prisma.chat.findUnique({
    where: { chatId },
    include: { user: true }
  })

  if (!chat) return null

  return {
    chatId: chat.chatId,
    userId: chat.userId,
    userName: chat.user.name || 'Unknown User'
  }
}

export async function getMessages(chatId: string) {
  const messages = await prisma.messages.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' }
  })

  return messages.map(message => ({
    messageId: message.messageId,
    text: message.text,
    files: message.files,
    createdAt: message.createdAt.toISOString(),
    isFromClient: message.isFromClient
  }))
}


export async function getCurrentUserChat() {
  const user = await currentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const userId = user.id!

  let chat = await prisma.chat.findFirst({
    where: { userId },
  })

  if (!chat) {
    chat = await prisma.chat.create({
      data: { userId },
    })
  }

  return {
    chatId: chat.chatId,
    userId: chat.userId,
  }
}