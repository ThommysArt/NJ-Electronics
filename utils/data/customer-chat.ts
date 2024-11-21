"server only"

import { prisma } from '@/prisma/connection'
import { auth } from '@/auth'
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { currentUser } from '@/lib/auth'

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
  
      // Create a corresponding document in Firebase
      await setDoc(doc(db, 'chats', chat.chatId), {
        userId: chat.userId,
        createdAt: new Date(),
      })
    }
  
    return {
      chatId: chat.chatId,
      userId: chat.userId,
    }
  }