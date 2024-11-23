export function generateOgImage(title: string, description: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nj-electronics.vercel.app'
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description)
  
    return `${baseUrl}/api/og?title=${encodedTitle}&description=${encodedDescription}`
  }