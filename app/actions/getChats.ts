import prisma from '@/app/lib/prismadb';
import { getCurrentUser } from './getUser';

const getChats = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
        return [];
    }

    try {
        const chats = await prisma.conversation.findMany({
            orderBy: {
                lastMesasgeAt: 'desc',
            },
            where: {
                userIds: {
                    has: currentUser.id,
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true,
                    },
                },
            },
        });
        return chats;
    } catch (error) {
        return [];
    }
};

export default getChats;
