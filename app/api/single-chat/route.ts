import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions/getUser';
import { User } from '@prisma/client';
import { pusherServer } from '@/app/lib/pusher';

interface UserRequestBody {
    user: User;
}

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body: UserRequestBody = await request.json();
        const { user } = body;

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        memberIds: {
                            equals: [currentUser.id, user.id],
                        },
                    },
                    {
                        memberIds: {
                            equals: [user.id, currentUser.id],
                        },
                    },
                ],
            },
        });
        if (existingConversations.length > 0) {
            return NextResponse.json(existingConversations[0]);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                members: {
                    connect: [{ id: currentUser.id }, { id: user.id }],
                },
            },
            include: {
                members: true,
            },
        });

        newConversation.members.forEach((member) => {
            if (member.email) {
                pusherServer.trigger(
                    member.email,
                    'conversation:new',
                    newConversation
                );
            }
        });
        return NextResponse.json(newConversation);
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SINGLE_CHAT');
        return new NextResponse(`Internal Error ${error}`, { status: 500 });
    }
}
