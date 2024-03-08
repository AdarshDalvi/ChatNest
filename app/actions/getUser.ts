'use server';

import prisma from '@/app/lib/prismadb';
import getCurrentSession from './getSession';

const getCurrentUser = async () => {
    try {
        const session = await getCurrentSession();

        if (!session?.user.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        console.log('ERROR IN GET USER', error);
        return null;
    }
};

const getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
    });
};

export { getUserByEmail, getCurrentUser };
