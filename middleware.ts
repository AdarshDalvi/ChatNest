import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default withAuth(
    async function middleware(req) {
        const pathName = req.nextUrl.pathname;

        //Mangae route protection
        const isAuth = await getToken({ req });
        const isLoginPage = pathName.startsWith('/login');
        const isRegisterPage = pathName.startsWith('/register');

        const sensitiveRoutes = ['/chats', '/people'];
        const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
            pathName.startsWith(route)
        );

        if (isLoginPage || isRegisterPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/chats', req.url));
            }

            return NextResponse.next();
        }

        if (!isAuth && isAccessingSensitiveRoute) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        if (pathName === '/') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    },
    {
        callbacks: {
            authorized: function () {
                return true;
            },
        },
    }
);

export const confige = {
    matcher: ['/', '/login', '/register', '/chats/:path*', '/people/:path*'],
};
