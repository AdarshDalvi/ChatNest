import prisma from '@/app/lib/prismadb';
import { getCurrentUser } from './getUser';

const getChatDetailsById = async (chatId: string) => {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
        return null;
    }

    try {
        const chat = await prisma.conversation.findUnique({
            where: {
                id: chatId,
            },
            include: {
                users: true,
            },
        });

        return chat;
    } catch (error) {
        return null;
    }
};

export default getChatDetailsById;
