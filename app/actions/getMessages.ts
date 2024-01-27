import prisma from '@/app/lib/prismadb';

const getMessages = async (chatId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: chatId,
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        return messages;
    } catch (error) {
        return null;
    }
};

export default getMessages;
