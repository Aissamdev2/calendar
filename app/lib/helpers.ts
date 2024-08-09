import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { UserCookie } from './definitions';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function verifyJWT(token: string) {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    });
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function getSession(): UserCookie | null {
  const sessionString = cookies().get('session')?.value;
  return sessionString ? JSON.parse(sessionString) : null;
}