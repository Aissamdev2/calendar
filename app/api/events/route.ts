import { sql } from '@vercel/postgres'
import { verifySession } from '@/app/lib/helpers'

export async function GET() {
  try {
    const session = await verifySession();
    const { id: userId } = session
    const events = (await sql`SELECT * FROM events WHERE userId = ${userId};`).rows
    console.log('Gotten events: ',events)
    return new Response(JSON.stringify(events))

  } catch (error) {
    console.log(error)
    return new Response('Unauthorized', { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await verifySession();
    const body = await request.json()
    if (!body)return new Response('Invalid request body', { status: 400 })
    const { name, date, time, description, subject } = body
    if (!name || !date) return new Response('Missing required fields', { status: 400 })
    console.log(`INSERT INTO events (name, date, time, userId) VALUES (${name}, ${date}, ${time}, ${session.id});`)
    await sql`INSERT INTO events (name, description, subject, date, time, userId) VALUES (${name}, ${description}, ${subject}, ${date}, ${time}, ${session.id});`
    return new Response('Event created')
  } catch (error) {
    console.log(error)
    return new Response('Unauthorized', { status: 401 })
  }
  
}