import { ChatView } from './_components/chat-view'
import { getChat, getMessages } from '@/utils/data/chats'
import { notFound } from 'next/navigation'

export default async function ChatPage({ params }: { params: { chatId: string } }) {
  const chat = await getChat(params.chatId)
  
  if (!chat) {
    notFound()
  }

  const messages = await getMessages(params.chatId)

  return (
    <div className="container mx-auto py-6">
      <ChatView initialChat={chat} initialMessages={messages} />
    </div>
  )
}