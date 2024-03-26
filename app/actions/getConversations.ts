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
                memberIds: {
                    has: currentUser.id,
                },
            },
            include: {
                members: true,
                groupCreatedBy: true,
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
        console.log(error, 'ERROR IN GET CONVERSATIONS');
        return [];
    }
};

export default getConversations;
