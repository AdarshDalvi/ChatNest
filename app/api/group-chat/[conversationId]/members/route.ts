import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';

interface IParamas {
    conversationId: string;
}

export async function PATCH(
    request: Request,
    { params }: { params: IParamas }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { members, action } = body;

        if (!currentUser || !currentUser.id || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        let data: any = {};

        if (action === 'connect') {
            data.members = {
                connect: [
                    ...members.map((member: { id: string }) => ({
                        id: member.id,
                    })),
                ],
            };
        } else if (action === 'disconnect') {
            data.members = {
                disconnect: [
                    ...members.map((member: { id: string }) => ({
                        id: member.id,
                    })),
                ],
            };

            data.admins = {
                disconnect: [
                    ...members.map((member: { id: string }) => ({
                        id: member.id,
                    })),
                ],
            };
        } else {
            // Handle invalid action
            return new NextResponse('Invalid action', { status: 400 });
        }

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: data,
        });

        return NextResponse.json(updatedConversation);
    } catch (error: any) {
        console.log('ERROR IN GROUP_CHAT_ADMIN', error);
        return new NextResponse(`Internal Error`, { status: 500 });
    }
}
