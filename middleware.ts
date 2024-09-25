// middleware.ts
import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from './config';

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
});

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const locale = nextUrl.locale;


  return nextIntlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en|fr)/:path*'],
};
