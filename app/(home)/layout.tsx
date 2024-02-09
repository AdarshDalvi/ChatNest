import React from 'react';
import { getCurrentUser } from '../actions/getUser';
import Header from './components/Header';
import getUsers from '../actions/getUsers';

interface HomePageLayoutProps {
    children: React.ReactNode;
}

export default async function HomePageLayout({
    children,
}: HomePageLayoutProps) {
    const currentUser = await getCurrentUser();
    const users = await getUsers();
    return (
        <>
            <main
                className="
                    relative
                    w-full
                    h-full
                    max-w-[1600px]
                    md:flex
                    "
            >
                <Header currentUser={currentUser!} users={users} />
                {children}
            </main>
        </>
    );
}
