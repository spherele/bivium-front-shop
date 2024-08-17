import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const authorizedRoutes = ['/order', '/personal'];
  const guestOnlyRoutes = ['/signin', '/signup'];

  if (cookies().has('user') && guestOnlyRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/personal', request.url));
  }

  if (!cookies().has('user') && authorizedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
};

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};
