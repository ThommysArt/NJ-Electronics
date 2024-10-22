import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'

export default function TopBar() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">NJ Electronics</Link>
        <nav>
          <Link href="/home/message">
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              Message Us
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}