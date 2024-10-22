import { ChatList } from './_components/chat-list'
import { getChats } from '@/utils/data/chats'

export default async function MessagesPage() {
  const chats = await getChats()

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <ChatList initialChats={chats} />
    </div>
  )
}