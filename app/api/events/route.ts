import { sql } from '@vercel/postgres'
import { getSession, verifyJWT } from '@/app/lib/helpers'

export async function GET() {
  const session = getSession()
  console.log(session)
  if (!session) {
    return new Response('no session', { status: 401 })
  }
  const { token } = session
  if (!token) {
    return new Response('no token', { status: 401 })
  }
  const payload = await verifyJWT(token)
  if (!payload) {
    return new Response('no payload', { status: 401 })
  }
  const { id: userId } = session
  if (!userId) {
    return new Response('no userId', { status: 401 })
  }
  const events = (await sql`SELECT * FROM events WHERE userId = ${userId};`).rows
  return new Response(JSON.stringify(events))
}

export async function POST(request: Request) {
  const session = getSession()
  if (!session) {
    console.log('no session')
    return new Response('Unauthorized', { status: 401 })
  }
  const { token } = session
  if (!token) {
    console.log('no token')
    return new Response('Unauthorized', { status: 401 })
  }
  const payload = await verifyJWT(token)
  if (!payload) {
    console.log('no payload')
    return new Response('Unauthorized', { status: 401 })
  }
  const { id: userId } = session
  if (!userId) {
    console.log('no userId')
    return new Response('Unauthorized', { status: 401 })
  }
  const body = await request.json()
  if (!body) {
    console.log('no body')
    return new Response('Invalid request body', { status: 400 })
  }
  console.log(body)
  const { name, date, time } = body
  if (!name || !date || !time) {
    console.log('missing required fields')
    return new Response('Missing required fields', { status: 400 })
  }
  await sql`INSERT INTO events (name, date, time, userId) VALUES (${name}, ${date}, ${time}, ${userId});`
  return new Response('Event created')
}