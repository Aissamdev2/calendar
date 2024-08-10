import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { UserCookie } from './definitions';

export async function verifyJWT(token: string) {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    });
    return payload;
  } catch (error) {
    console.log('token: ', token, 'jwtsecret: ', process.env.JWT_SECRET);
    throw error;
  }
}

export function getSession(): UserCookie | null {
  const sessionString = cookies().get('session')?.value;
  return sessionString ? JSON.parse(sessionString) : null;
}