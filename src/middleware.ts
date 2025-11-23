import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Rotas públicas
  const publicRoutes = ['/', '/auth'];
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  // Se não está autenticado e tenta acessar rota protegida
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Se está autenticado e tenta acessar página de auth
  if (session && req.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Se está autenticado e está na home, redirecionar para dashboard
  if (session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/auth', '/dashboard/:path*', '/groups/:path*', '/expenses/:path*', '/settings/:path*'],
};
