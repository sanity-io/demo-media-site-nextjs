// middleware.ts
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // all else fails, send them to the "home" route with no experiments
  return NextResponse.rewrite(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}