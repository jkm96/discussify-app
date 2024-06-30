import {NextRequest, NextResponse} from 'next/server';
import {apiKey, cookieName, internalBaseUrl} from '@/boundary/constants/appConstants';
import {
    authRoutes,
    NAVIGATION_LINKS,
    protectedRoutes,
    publicRoutes,
    specialRoutes,
} from '@/boundary/configs/navigationConfig';
import {AccessTokenModel} from '@/boundary/interfaces/token';
import {UserResponse} from "@/boundary/interfaces/user";

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
                {type: 'header', key: 'next-router-prefetch'},
                {type: 'header', key: 'purpose', value: 'prefetch'},
            ],
        },
    ],
};

function handleRedirect(user: UserResponse, pathName: any, requestUrl: any) {
    // User is authenticated and accessing a public route
    // redirect to dashboard if admin
    if (user.isAdmin) {
        console.info('admin',pathName)
        if (!pathName.includes('admin') && !pathName.includes(NAVIGATION_LINKS.LOGOUT)) {
            console.info('admin but accessed public route')
            return NextResponse.redirect(new URL(NAVIGATION_LINKS.ADMIN_DASHBOARD, requestUrl));
        }

        if (authRoutes.includes(pathName)) {
            return NextResponse.redirect(new URL(NAVIGATION_LINKS.ADMIN_DASHBOARD, requestUrl));
        } else {
            return NextResponse.next();
        }
    }

    if (!user.isAdmin && pathName.includes('admin')) {
        return NextResponse.redirect(new URL(NAVIGATION_LINKS.HOME, requestUrl));
    } else {
        if (authRoutes.includes(pathName)) {
            return NextResponse.redirect(new URL(NAVIGATION_LINKS.HOME, requestUrl));
        } else {
            return NextResponse.next();
        }
    }
}

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
    if (request.url.includes(`${internalBaseUrl}`) && !request.url.includes('api')) {
        if (specialRoutes.includes(pathName)) {
            console.log('User is accessing a special route');
            // Allow access to a special routes
            return NextResponse.next();
        }
        const cookie = request.cookies.get(cookieName)?.value;

        console.log('user is accessing pathName', pathName);
        if (cookie === undefined) {
            console.log('cookie is undefined')
            if (protectedRoutes.some(route => pathName.startsWith(route))) {
                console.log('User is not authenticated and trying to access a protected route');
                if (pathName.includes('admin')) {
                    // Redirect to admin login
                    return NextResponse.redirect(new URL(NAVIGATION_LINKS.ADMIN_LOGIN, request.url));
                } else {
                    // Redirect to user login
                    return NextResponse.redirect(new URL(NAVIGATION_LINKS.LOGIN, request.url));
                }
            }

            if (!authRoutes.some(route => pathName.startsWith(route)) && protectedRoutes.some(route => pathName.startsWith(route))) {
                console.log('User is not authenticated and trying to access a protected route');
                // User is not authenticated and trying to access a protected route
                return NextResponse.redirect(new URL(NAVIGATION_LINKS.LOGIN, request.url));
            }

            if (publicRoutes.some(route => pathName.startsWith(route)) || authRoutes.some(route => pathName.startsWith(route))) {
                console.log('User is not authenticated and trying to access a public/auth route');
                // User is not authenticated and trying to access a public/auth route -  allow access
                return NextResponse.next();
            }
        }

        if(cookie){
            console.log('cookie is defined')
            const tokenData: AccessTokenModel = JSON.parse(cookie);
            const user = tokenData.user;

            return handleRedirect(user, pathName, request.url);
        }

        return NextResponse.next();
    }

    // if (request.url.includes(`${internalBaseUrl}`)) {
    //     let response = await getAccessToken();
    //     if (response.statusCode === 200) {
    //         const tokenResponse = response.data;
    //         if (tokenResponse) {
    //             let response = NextResponse.next();
    //             response.cookies.set({
    //                 name: `${cookieName}`,
    //                 value: JSON.stringify(tokenResponse),
    //                 httpOnly: true,
    //                 secure: process.env.NODE_ENV !== 'development',
    //                 sameSite: 'strict',
    //                 path: '/',
    //             });
    //
    //             return response;
    //         }
    //     }
    // }
}