import {NextRequest, NextResponse} from 'next/server';
import {apiKey, cookieName, internalBaseUrl} from '@/boundary/constants/appConstants';
import {getAccessToken} from '@/lib/services/token/tokenService';
import {
    authRoutes,
    NAVIGATION_LINKS,
    protectedRoutes,
    publicRoutes,
    specialRoutes,
} from '@/boundary/configs/navigationConfig';
import {AccessTokenModel} from '@/boundary/interfaces/token';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  if (request.url.includes('/api/')) {
    const clientApiKey = request.headers.get('x-api-key');
    if (clientApiKey !== apiKey) {
      return NextResponse.redirect(new URL(NAVIGATION_LINKS.LOGIN, request.url));
    }
  }

  //if authenticated and accessing protected routes
  //if authenticated and accessing public/auth routes
  //if not authenticated and accessing  protected routes
  //if not authenticated and accessing public/auth routes
  if (request.url.includes(`${internalBaseUrl}`)) {
    if (specialRoutes.includes(pathName)) {
      console.log('User is accessing a special route');
      // Allow access to a special routes
      return NextResponse.next();
    }
    const cookie = request.cookies.get(cookieName)?.value;
    console.log('pathName', pathName);
    if (cookie === undefined) {
      console.log('cookie is undefined')
      if (protectedRoutes.some(route => pathName.startsWith(route))) {
        console.log('User is not authenticated and trying to access a protected route');
        if (pathName.includes('admin')) {
          // Redirect to admin login
          console.log('Redirecting to admin login');
          return NextResponse.redirect(new URL(NAVIGATION_LINKS.ADMIN_LOGIN, request.url));
        } else {
          // Redirect to user login
          console.log('Redirecting to user login');
          return NextResponse.redirect(new URL(NAVIGATION_LINKS.LOGIN, request.url));
        }
      }

      if (!authRoutes.includes(pathName) && protectedRoutes.includes(pathName)) {
        console.log('User is not authenticated and trying to access a protected route');
        // User is not authenticated and trying to access a protected route
        return NextResponse.redirect(new URL(NAVIGATION_LINKS.LOGIN, request.url));
      } else if (publicRoutes.includes(pathName) || authRoutes.includes(pathName)) {
        console.log('User is not authenticated and trying to access a public/auth route');
        // User is not authenticated and trying to access a public/auth route -  allow access
        return NextResponse.next();
      }
    } else {
      const tokenData: AccessTokenModel = JSON.parse(cookie);
      const user = tokenData.user;

      if (protectedRoutes.includes(pathName)) {
        // User is authenticated and accessing a protected route
        console.log('User is authenticated and trying to access a protected route');

        return NextResponse.next();
      } else if (publicRoutes.includes(pathName) || authRoutes.includes(pathName)) {
        console.log('User is authenticated and trying to access a public/auth route');
        // User is authenticated and accessing a public route
        // redirect to dashboard if admin
        if (user.isAdmin)
          return NextResponse.redirect(new URL(NAVIGATION_LINKS.ADMIN_DASHBOARD , request.url));
        else
          return NextResponse.next();
      }
    }

    return NextResponse.next();
  }

  if (request.url.includes(`${internalBaseUrl}`)) {
    let response = await getAccessToken();
    if (response.statusCode === 200) {
      const tokenResponse = response.data;
      if (tokenResponse) {
        let response = NextResponse.next();
        response.cookies.set({
          name: `${cookieName}`,
          value: JSON.stringify(tokenResponse),
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          path: '/',
        });

        return response;
      }
    }
  }
}