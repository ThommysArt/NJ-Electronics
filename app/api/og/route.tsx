import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'NJ Electronics'
  const description = searchParams.get('description') || 'Your one-stop shop for all electronics needs'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`}
          alt="NJ Electronics Logo"
          width={200}
          height={200}
        />
        <div style={{ marginTop: 40 }}>{title}</div>
        <div
          style={{
            marginTop: 20,
            fontSize: 24,
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}