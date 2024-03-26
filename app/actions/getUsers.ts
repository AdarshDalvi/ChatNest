'use server';

import prisma from '@/app/lib/prismadb';
import getCurrentSession from './getSession';

const getUsers = async () => {
    const session = await getCurrentSession();

    if (!session?.user.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            // where: {
            //     // NOT: {
            //     //     email: session.user.email,
            //     // },
            // },
        });
        return users;
    } catch (error: any) {
        return [];
    }
};

export default getUsers;
