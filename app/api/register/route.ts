import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, phone, name, password } = body;
        if (!email || !phone || !name || !password) {
            return new NextResponse('Missing Info' || { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        const existingUserByPhone = await prisma.user.findUnique({
            where: {
                phone: phone,
            },
        });
        if (existingUserByEmail) {
            return new NextResponse(
                'Email already in use!,Please choose a different email.',
                { status: 409 }
            );
        } else if (existingUserByPhone) {
            return new NextResponse(
                'Phone number already in use!,Please choose a different phone number.',
                { status: 409 }
            );
        }
        const provider = 'credentials';
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                hashedPassword,
                provider,
                emailVerified: new Date(),
            },
        });
        return NextResponse.json(user);
    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
