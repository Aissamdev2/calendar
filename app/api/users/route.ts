import { sql } from '@vercel/postgres'


export async function GET(request: Request) {
  const { email } = await request.json()

  const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`

  return new Response(JSON.stringify(rows))
}