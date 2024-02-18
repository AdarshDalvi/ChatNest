import { getCurrentUser } from '@/app/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';

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

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.log(error, 'PROFILE_SETTINGS');
        return new NextResponse('Error', { status: 500 });
    }
}
