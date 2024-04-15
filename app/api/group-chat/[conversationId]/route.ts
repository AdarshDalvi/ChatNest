import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { pusherServer } from '@/app/lib/pusher';

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
        const { groupName, groupDescription, groupIcon } = body;

        if (!currentUser || !currentUser.id || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
        });

        if (!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                groupName,
                groupIcon,
                groupDescription,
            },
            include: {
                members: true,
            },
        });

        await pusherServer.trigger(
            conversationId,
            'conversation:group-update',
            {
                id: conversationId,
                groupName: updatedConversation.groupName,
                groupDescription: updatedConversation.groupDescription,
                groupIcon: updatedConversation.groupIcon,
            }
        );

        for (const member of updatedConversation.members) {
            if (member.email) {
                pusherServer.trigger(
                    member.email,
                    'conversation:group-update',
                    {
                        id: conversationId,
                        groupName: updatedConversation.groupName,
                        groupDescription: updatedConversation.groupDescription,
                        groupIcon: updatedConversation.groupIcon,
                    }
                );
            }
        }

        return NextResponse.json(updatedConversation);
    } catch (error: any) {
        console.log(error, 'ERROR_GROUP_CONVERSATION_UPDATE');
        return new NextResponse(`Internal Error ${error}`, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParamas }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { isMemberAdmin, memberLength } = body;

        if (!currentUser || !currentUser.id || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (memberLength === 1) {
            const deletedConversation = await prisma.conversation.delete({
                where: {
                    id: conversationId,
                },
            });

            return NextResponse.json(deletedConversation);
        }

        let admins = {};
        if (isMemberAdmin) {
            admins = {
                disconnect: {
                    id: currentUser.id,
                },
            };
        }

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                members: {
                    disconnect: {
                        id: currentUser.id,
                    },
                },
                admins: admins,
            },
            include: {
                members: true,
            },
        });

        return NextResponse.json(updatedConversation);
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_GROUP_CHAT_MEMBER_REMOVE');
        return new NextResponse(`Internal Error ${error}`, { status: 500 });
    }
}
