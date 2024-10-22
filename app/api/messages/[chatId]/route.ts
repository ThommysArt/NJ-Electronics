import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/connection'

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  const chatId = params.chatId

  const messages = await prisma.messages.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(messages)
}