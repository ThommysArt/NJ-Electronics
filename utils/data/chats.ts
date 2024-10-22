"server only"

import { prisma } from '@/prisma/connection'


export async function getChats () {
  return await prisma.chat.findMany({
    include: {
      user: true,
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })
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

