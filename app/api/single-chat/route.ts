import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions/getUser';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { userId } = body;

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId],
                        },
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id],
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
                users: {
                    connect: [{ id: currentUser.id }, { id: userId }],
                },
            },
            include: {
                users: true,
            },
        });

        return NextResponse.json(newConversation);
    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SINGLE_CHAT');
        return new NextResponse(`Internal Error ${error}`, { status: 500 });
    }
}
