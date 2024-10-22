import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/connection'

export async function GET() {
  try {
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

    const formattedChats = chats.map(chat => ({
      chatId: chat.chatId,
      userId: chat.userId,
      userName: chat.user.name || 'Unknown User',
      lastMessage: chat.messages[0]?.text || '',
      lastMessageTime: chat.messages[0]?.createdAt || chat.updatedAt,
      unreadCount: chat.messages.filter(m => !m.isRead && m.isFromClient).length
    }))

    return NextResponse.json(formattedChats)
  } catch (error) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}