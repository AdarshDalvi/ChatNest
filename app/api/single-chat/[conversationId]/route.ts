import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import primsa from '@/app/lib/prismadb';

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

        const existingChat = await primsa.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
            },
        });

        if (!existingChat) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedChat = await prisma?.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id],
                },
            },
        });

        return NextResponse.json(deletedChat);
    } catch (error: any) {
        console.log(error, 'ERROR_DELETE_CHAT');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
