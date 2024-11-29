import { sql } from '@vercel/postgres'
import { verifySession } from '@/app/lib/helpers'
import { User } from '@/app/lib/definitions';

export async function GET() {

  try {
    const verification = await verifySession();
    const session = verification.session
    if (!session) return new Response('Unauthorized', { status: 401 })
    const { id } = session
    const user = (await sql`SELECT * FROM users WHERE id = ${id}`).rows[0] as User
    return new Response(JSON.stringify(user))
  } catch (error) {
    return new Response('Unauthorized', { status: 401 })
  }
}