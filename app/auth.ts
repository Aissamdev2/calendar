'use server';

import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { SignJWT } from "jose";
import { User } from "./lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function signUp(formData: FormData) {
  const client = await db.connect();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "user";

  const user = await client
    .sql<User>`INSERT INTO users (name, role, email, password) VALUES (${name}, ${role}, ${email}, ${hashedPassword}) RETURNING *`
    .then((res) => res.rows[0]);
  
  if (!user) {
    throw new Error('User not created', { cause: 'USER_NOT_CREATED' });
  }

  redirect("/login");
}



export async function signIn(formData: FormData) {
  const client = await db.connect();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await client
    .sql<User>`SELECT * FROM users WHERE email = ${email}`
    .then((res) => res.rows[0])

  if (!user) {
    throw new Error('Email not found', { cause: 'EMAIL_NOT_FOUND' });
  }

  const hashedPassword = user?.password;

  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    throw new Error('Invalid password', { cause: 'INVALID_PASSWORD' });
  }

  const token = await new SignJWT({ id: user?.id, email })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('7d')
  .setIssuedAt()
  .setIssuer(process.env.JWT_ISSUER as string)
  .setAudience(process.env.JWT_AUDIENCE as string)
  .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  const session = {
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