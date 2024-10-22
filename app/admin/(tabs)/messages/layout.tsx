import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { getChats } from "@/utils/data/chats"
import { ChatList } from "./_components/chat-list"



export default async  function MessagesLayout({ children }: { children: React.ReactNode }) {
    const chats = await getChats()

    return (
        <div className="flex h-screen pb-16 sm:pb-0">
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden absolute top-4 left-4 z-50">
                <Menu className="h-6 w-6" />
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Chats</h2>
                <ChatList chats={chats}/>
            </div>
            </SheetContent>
        </Sheet>
        <div className="hidden lg:block w-1/4 border-r">
            <div className="py-4">
            <h2 className="text-lg font-semibold mb-4 px-4">Chats</h2>
            <ChatList chats={chats} />
            </div>
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
        </div>
    )
}