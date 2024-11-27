import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, events } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      year VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, year, role, email, password)
        VALUES (${user.id}, ${user.name}, ${user.year}, ${user.role}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedEvents() {
  await client.sql`CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    description TEXT,
    date DATE NOT NULL,
    time VARCHAR(255),
    userId UUID NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  );`;

  const insertedEvents = await Promise.all(
    events.map(async (event) => {
      return client.sql`
        INSERT INTO events (id, name, subject, description, date, time, userId)
        VALUES (${event.id}, ${event.name}, ${event.subject}, ${event.description}, ${event.date}, ${event.time}, ${event.userId})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedEvents();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}