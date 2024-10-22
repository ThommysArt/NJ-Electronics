import { getCurrentUserChat } from '@/utils/data/customer-chat'
import ChatView from './_components/chat-view'

export default async function MessagePage() {
  const chat = await getCurrentUserChat()

  return (
    <div className="min-h-screen bg-background">
      <ChatView initialChat={chat} />
    </div>
  )
}