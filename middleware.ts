// middleware.ts
import { homeMiddleware } from 'lib/homeVariationsMiddleware'
import { NextMiddleware, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export const middleware: NextMiddleware = async (request, event) => {
  try {
    const homeResponse = await homeMiddleware(request, event)

    if (homeResponse) {
      return homeResponse
    }

  } catch (e) {
    console.error(e)
  }

  // all else fails, send them to the "home" route with no experiments
  return NextResponse.rewrite(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}