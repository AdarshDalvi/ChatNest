'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';

export default async function getCurrentSession() {
    return await getServerSession(authOptions);
}
