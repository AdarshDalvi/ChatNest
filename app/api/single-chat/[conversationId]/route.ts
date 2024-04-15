import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { pusherServer } from '@/app/lib/pusher';

interface IParamas {
    conversationId: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParamas }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                members: true,
            },
        });

        if (!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                memberIds: {
                    hasSome: [currentUser.id],
                },
            },
        });

        existingConversation.members.forEach((member) => {
            if (member.email) {
                pusherServer.trigger(
                    member.email,
                    'conversation:remove',
                    existingConversation
                );
            }
        });

        return NextResponse.json(deletedConversation);
    } catch (error: any) {
        console.log(error, 'ERROR_DELETE_CHAT');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
