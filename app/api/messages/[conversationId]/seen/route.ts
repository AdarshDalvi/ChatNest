import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { pusherServer } from '@/app/lib/pusher';

interface IParamas {
    conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParamas }) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Find Existing Conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    },
                },
                members: true,
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

        if (!unseenMessages || unseenMessages.length < 1) {
            return NextResponse.json(conversation);
        }

        const unseenMessageIds = unseenMessages.map(
            (unseenMessage) => unseenMessage.id
        );

        const updatedMessages = unseenMessages.map(async (unseenMessage) => {
            await prisma.message.update({
                where: {
                    id: unseenMessage.id,
                },
                data: {
                    seenIds: {
                        set: Array.from(
                            new Set([...unseenMessage.seenIds, currentUser.id])
                        ),
                    },
                },
            });
        });
        await Promise.all(updatedMessages);

        const updatedUnseenMessages = unseenMessages.map((unseenMessage) => {
            return {
                ...unseenMessage,
                seenIds: Array.from(
                    new Set([...unseenMessage.seenIds, currentUser.id])
                ),
                seen: Array.from(new Set([...unseenMessage.seen, currentUser])),
            };
        });

        // Update all connections with new seen
        await pusherServer.trigger(currentUser.email!, 'conversation:update', {
            id: conversationId,
            messages: updatedUnseenMessages,
        });

        await pusherServer.trigger(
            conversationId!,
            'messages:update',
            updatedUnseenMessages
        );

        return NextResponse.json(updatedUnseenMessages);
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SEEN');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
