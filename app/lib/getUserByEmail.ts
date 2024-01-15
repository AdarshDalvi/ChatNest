import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
    });
};

export default getUserByEmail;
