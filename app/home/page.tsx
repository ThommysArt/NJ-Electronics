import TopBar from './_components/top-bar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to NJ Electronics</h1>
        {/* Add more content for the home page here */}
      </main>
    </div>
  )
}