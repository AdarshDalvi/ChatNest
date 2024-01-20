import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/actions/getUser';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { members, name } = body;

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newGroupConversation = await prisma.conversation.create({
            data: {
                name,
                isGroup: true,
                users: {
                    connect: [
                        ...members.map((member: { value: string }) => ({
                            id: member.value,
                        })),
                        {
                            id: currentUser.id,
                        },
                    ],
                },
            },
            include: {
                users: true,
            },
        });
        return NextResponse.json(newGroupConversation);
    } catch (error: any) {
        return new NextResponse(`Internal Error ${error}`, { status: 500 });
    }
}
