import { NextRequest } from 'next/server'
import { verifyJWT, getSession } from './app/lib/helpers';

export async function middleware(request: NextRequest) {
  const session = getSession()

  if (!session && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }

  if (session && !request.nextUrl.pathname.startsWith('/gemif/calendar')) {
    if (!session.token) {
      return Response.redirect(new URL('/login', request.url))
    }
    
    try {
      await verifyJWT(session.token);
    } catch (error) {
      return Response.redirect(new URL('/login', request.url))
    }

    request.headers.set('session', JSON.stringify(session))
    
    return Response.redirect(new URL('/gemif/calendar', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/:path'],
}
