import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const { message, image, chatId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: chatId,
                    },
                },
                sender: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                seen: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                seen: true,
                sender: true,
            },
        });

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: chatId,
            },
            data: {
                lastMesasgeAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    },
                },
            },
        });

        return NextResponse.json(newMessage);
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('InternalError', { status: 500 });
    }
}
