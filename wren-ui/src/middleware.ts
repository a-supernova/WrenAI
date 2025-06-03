import type { NextRequest } from 'next/server'
import { decrypt } from './lib/auth';
 
export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value
 
  if (currentUser) {
    try {
      let sessionDecrypted = await decrypt(currentUser);
      if(!sessionDecrypted) {
        throw new Error("Invalid session!");
      }
    } catch(e) {
      return Response.redirect(new URL('/login', request.url))  
    }
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}