import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { pusherServer } from '@/app/lib/pusher';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        if (!currentUser || !currentUser.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const { name, image, about } = body;

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name: name,
                image: image,
                about: about,
            },
        });

        for (const userConversationId of updatedUser.conversationIds) {
            pusherServer.trigger(
                userConversationId,
                'member:update',
                updatedUser
            );
        }

        await pusherServer.trigger(
            currentUser.email!,
            'profile:update',
            updatedUser
        );

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.log(error, 'PROFILE_SETTINGS');
        return new NextResponse('Error', { status: 500 });
    }
}
