'use server';

import bcrypt from "bcrypt";
import { db, VercelPoolClient } from "@vercel/postgres";
import { SignJWT } from "jose";
import { User, UserCookie } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SUBJECTS_COLORS_OBJ, SUBJECTS_BG_COLORS_OBJ, SUBJECTS_BORDER_COLORS_OBJ } from "@/app/lib/utils";
import { SUBJECTS_PLAIN } from "./subjects";
import { SUBJECTS } from "./subjects";



async function seedInitialSubjects(user: User, client: VercelPoolClient) {
  const now = new Date();
  const quadri = now.getMonth() < 7 ? 1 : 0;
  const subjects = ['Otros',...SUBJECTS[Number(user.year) - 1][quadri]]

  subjects.forEach(async (subject) => {
    await client.sql`
    INSERT INTO subjects (
      name, color, bgColor, borderColor, userId
    ) VALUES (
      ${subject}, ${SUBJECTS_COLORS_OBJ[subject]}, ${SUBJECTS_BG_COLORS_OBJ[subject]}, ${SUBJECTS_BORDER_COLORS_OBJ[subject]}, ${user.id}
    ) ON CONFLICT (id) DO NOTHING;
    `;
  });


}

export async function signUp(formData: FormData): Promise<string> {
  const client = await db.connect();
  const name = formData.get("name") as string;
  const year = formData.get("year") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "user";


  const user = await client
    .sql<User>`INSERT INTO users (name, role, year, email, password) VALUES (${name}, ${role}, ${year}, ${email}, ${hashedPassword}) RETURNING *`
    .then((res) => res.rows[0]);
  
  if (!user) {
    return "USER_NOT_CREATED";
  }

  await seedInitialSubjects(user, client);

  redirect("/login");
}



export async function signIn(formData: FormData): Promise<string> {
  const client = await db.connect();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await client
    .sql<User>`SELECT * FROM users WHERE email = ${email}`
    .then((res) => res.rows[0])

  if (!user) {
    return "EMAIL_NOT_FOUND";
  }

  const hashedPassword = user?.password;

  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    return "INVALID_PASSWORD";
  }
  let token: string;
  try {
    token = await new SignJWT({ id: user?.id, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER as string)
    .setAudience(process.env.JWT_AUDIENCE as string)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  } catch (error) {
    return "UNEXPECTED_ERROR";
  }

  const session: UserCookie = {
    id: user?.id,
    token: token
  }

  cookies().set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });

  redirect('/gemif/calendar');
}

export async function signOut(): Promise<string> {
  try {
    cookies().delete('session');
  } catch (error) {
  return "NO_SESSION_TO_DELETE";
  }
  redirect('/login');
}