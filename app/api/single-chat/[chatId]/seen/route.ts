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

        const lastMessage =
            conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return NextResponse.json(conversation);
        }

        //Update Seen of last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id,
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        });

        return NextResponse.json(updatedMessage);
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SINGLE_CHAT_CHAT_ID_SEEN');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
