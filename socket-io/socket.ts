import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import { prisma } from '@/prisma/connection'

export function initSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // In production, replace with your frontend URL
    },
  })

  io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('join', (chatId) => {
      socket.join(chatId)
      console.log(`User joined chat: ${chatId}`)
    })

    socket.on('message', async ({ chatId, message }) => {
      const savedMessage = await prisma.messages.create({
        data: {
          chatId,
          text: message.text,
          files: message.files,
          isFromClient: message.isFromClient,
        },
      })

      io.to(chatId).emit('message', savedMessage)
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })

  return io
}