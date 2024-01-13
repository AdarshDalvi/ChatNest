'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface AuthContextProps {
    children: React.ReactNode;
    session: Session | null;
}

async function AuthContext({ children, session }: AuthContextProps) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default AuthContext;
