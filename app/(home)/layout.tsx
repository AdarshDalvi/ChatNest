import React from 'react';
import { getCurrentUser } from '../actions/getUser';
import Header from './components/Header';

interface HomePageLayoutProps {
    children: React.ReactNode;
}

export default async function HomePageLayout({
    children,
}: HomePageLayoutProps) {
    const currentUser = await getCurrentUser();
    return (
        <>
            <main className="relative w-full max-w-[1600px] h-screen text-white md:flex">
                <Header currentUser={currentUser!} />
                {children}
            </main>
        </>
    );
}