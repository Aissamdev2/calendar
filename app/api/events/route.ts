import { sql } from '@vercel/postgres'
import { verifySession } from '@/app/lib/helpers'

export async function GET() {
  try {
    const verification = await verifySession();
    const session = verification.session
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { id: userId } = session
    const events = (await sql`SELECT * FROM events WHERE userId = ${userId};`).rows
    return new Response(JSON.stringify(events))

  } catch (error) {
    console.log(error)
    return new Response('Unauthorized', { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    const verification = await verifySession();
    const session = verification.session
    if (!session) return new Response('Unauthorized', { status: 401 })
    const body = await request.json()
    if (!body)return new Response('Invalid request body', { status: 400 })
    const { name, date, time, description, subject } = body
    if (!name || !date) return new Response('Missing required fields', { status: 400 })
    await sql`INSERT INTO events (name, description, subject, date, time, userId) VALUES (${name}, ${description}, ${subject}, ${date}, ${time}, ${session.id});`
    return new Response('Event created')
  } catch (error) {
    console.log(error)
    return new Response('Unauthorized', { status: 401 })
  }
  
}