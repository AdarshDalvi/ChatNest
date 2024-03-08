'use server';
import prisma from '@/app/lib/prismadb';
import { getCurrentUser } from './getUser';

const getChatDetailsById = async (conversationId: string | null) => {
    if (!conversationId) {
        return null;
    }
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.email) {
        return null;
    }

    try {
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                        sender: true,
                    },
                },
                groupCreatedBy: true,
                admins: {
                    include: {
                        adminConversations: true,
                    },
                },
            },
        });

        return conversation;
    } catch (error) {
        console.log('ERROR IN GET CHAT DETAILS', error);
        return null;
    }
};

export default getChatDetailsById;
