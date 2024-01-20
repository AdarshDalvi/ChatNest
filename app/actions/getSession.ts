'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function getCurrentSession() {
    return await getServerSession(authOptions);
}
