import brcypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/lib/prismadb';
import { getUserByEmail } from '@/app/actions/getUser';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    pages: {
        // signIn: '/auth/login',
        signIn: '/error',
    },
    events: {
        async linkAccount({ user, account }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date(), provider: account.provider },
            });
        },
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                loginId: { label: 'loginId', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.loginId || !credentials.password) {
                    throw new Error('Invalid Credentials');
                }

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credentials.loginId },
                            { phone: credentials.loginId },
                        ],
                    },
                });

                if (!user) {
                    throw new Error('Account Not Found!');
                }

                if (!user.hashedPassword) {
                    throw new Error(
                        'User logged in via third-party provider (Google or GitHub)'
                    );
                }

                const isCorrectPassword = await brcypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                if (!isCorrectPassword) {
                    throw new Error('Password is invalid, please try again!');
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            const existingUser = await getUserByEmail(
                user.email || 'notAnEmail'
            );
            if (existingUser && existingUser.provider !== account?.provider) {
                throw new Error('OAuthAccountNotLinked');
            } else {
                return true;
            }
        },
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
