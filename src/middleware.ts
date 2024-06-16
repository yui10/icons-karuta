import { availableLanguages, cookieName, defaultLanguage } from '@/i18n/settings';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

const getNegotiatedLanguage = (
  headers: Negotiator.Headers,
): string | undefined => {
  return new Negotiator({ headers }).language([...availableLanguages]);
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export function middleware(request: NextRequest) {
  let preferredLanguage: string | undefined;

  // If the cookie contains language information.
  if (request.cookies.has(cookieName)) {
    preferredLanguage = getNegotiatedLanguage({
      'accept-language': request.cookies.get(cookieName)?.value ?? '',
    });
  }

  // If the cookie does not contain language information.
  if (!preferredLanguage) {
    preferredLanguage = getNegotiatedLanguage({
      'accept-language': request.headers.get('accept-language') ?? '',
    });
  }
  // Set default language if cookie and Accept-Language header do not contain language information.
  preferredLanguage ??= defaultLanguage;

  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = availableLanguages.every(
    (lang) => !pathname.startsWith(`/${lang}`),
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${preferredLanguage}${pathname}`, request.url),
    );
  }

  if (request.headers.has('referer')) {
    const referer = new URL(request.headers.get('referer') ?? '');
    const refererLanguage = availableLanguages.find((lang) => referer.pathname.startsWith(`/${lang}`));
    const response = NextResponse.next();
    if (refererLanguage) response.cookies.set(cookieName, refererLanguage);
    return response;
  }

  return NextResponse.next();
}
