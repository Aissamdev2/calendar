import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, events, subjects } from '../lib/placeholder-data';

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
        INSERT INTO users (
          id, name, year, role, email, password
        ) VALUES (
          ${user.id}, ${user.name}, ${user.year}, ${user.role},
          ${user.email}, ${hashedPassword}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedUsers;
}

async function seedSubjects() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS subjects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      color TEXT NOT NULL,
      bgColor TEXT NOT NULL,
      borderColor TEXT NOT NULL,
      userId UUID NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const insertedSubjects = await Promise.all(
    subjects.map(async (subject) => {
      return client.sql`
        INSERT INTO subjects (id, name, color, bgColor, borderColor, userId)
        VALUES (${subject.id}, ${subject.name}, ${subject.color}, ${subject.bgColor}, ${subject.borderColor}, ${subject.userId})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedSubjects;
}

async function seedEvents() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      time VARCHAR(255),
      userId UUID NOT NULL,
      subjectId UUID NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE
    );
  `;

  const insertedEvents = await Promise.all(
    events.map(async (event) => {
      return client.sql`
        INSERT INTO events (id, name, description, date, time, userId, subjectId)
        VALUES (${event.id}, ${event.name}, ${event.description}, ${event.date}, ${event.time}, ${event.userId}, ${event.subjectId})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  return insertedEvents;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedSubjects();
    await seedEvents();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
