import prisma from '@/app/lib/prismadb';
import { getCurrentUser } from './getUser';

const getConversations = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
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
        return conversations;
    } catch (error) {
        return [];
    }
};

export default getConversations;
