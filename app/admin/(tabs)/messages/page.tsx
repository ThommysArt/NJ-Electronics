import { getChats } from "@/utils/data/chats";
import { redirect } from "next/navigation";

export default async function MessagesPage () {
    const chats = await getChats()
    redirect(`/admin/messages/${chats[0]?.chatId}`)
}