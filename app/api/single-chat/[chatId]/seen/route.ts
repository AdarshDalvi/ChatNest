import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';

interface IParamas {
    chatId?: string;
}

export async function POST(request: Request, { params }: { params: IParamas }) {
    try {
        const currentUser = await getCurrentUser();
        const { chatId } = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Find Existing Conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: chatId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    },
                },
                users: true,
            },
        });

        if (!conversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const unseenMessages = conversation.messages.filter((message) => {
            const isMessageSeen = message.seen.some(
                (seenUser) => seenUser.email === currentUser.email
            );
            return !isMessageSeen;
        });

        if (!unseenMessages || unseenMessages.length < 0) {
            return NextResponse.json(conversation);
        }

        const updatedMessages = await prisma.message.updateMany({
            where: {
                id: {
                    in: unseenMessages.map((message) => message.id),
                },
            },
            data: {
                seenIds: {
                    push: currentUser.id,
                },
            },
        });

        return NextResponse.json(updatedMessages);
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SINGLE_CHAT_CHAT_ID_SEEN');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
