// Middleware desabilitado temporariamente para MVP frontend
// Será reativado quando implementarmos autenticação real

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Por enquanto, apenas permite todas as rotas sem autenticação
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth', '/dashboard/:path*', '/groups/:path*', '/expenses/:path*', '/settings/:path*'],
};
