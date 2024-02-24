import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default withAuth(
    async function middleware(req) {
        const pathName = req.nextUrl.pathname;

        //Manage route protection
        const isAuth = await getToken({ req });
        const isLoginPage = pathName.startsWith('/login');
        const isRegisterPage = pathName.startsWith('/register');

        const isAccessingSensitiveRoute = pathName === '/';

        if (isLoginPage || isRegisterPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/', req.url));
            }

            return NextResponse.next();
        }

        if (!isAuth && isAccessingSensitiveRoute) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        // if (pathName === '/') {
        //     return NextResponse.redirect(new URL('/login', req.url));
        // }

        if (pathName === '/error') {
            if (isAuth) {
                return NextResponse.redirect(new URL('/', req.url));
            }
            return NextResponse.next();
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

export const config = {
    matcher: ['/', '/login', '/register', '/error'],
};
