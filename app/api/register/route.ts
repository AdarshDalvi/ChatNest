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
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { phone: phone }],
            },
        });
        if (existingUser) {
            return new NextResponse(
                'User already exists!,Please choose a different email or phone number.',
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
