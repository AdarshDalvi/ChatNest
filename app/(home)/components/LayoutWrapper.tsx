'use client';

import { User } from '@prisma/client';
import Header from './Header';
import { usePathname } from 'next/navigation';
import EmptyState from '../../components/EmptyState';

interface LayoutWrapperProps {
    optionalComponent?: React.ReactNode;
    children: React.ReactNode;
    currentUser: User;
}

function LayoutWrapper({
    children,
    optionalComponent,
    currentUser,
}: LayoutWrapperProps) {
    const pathname = usePathname();

    const isChatPage = pathname.includes('/chats');
    return (
        <main className="w-full max-w-[1600px] h-screen text-white md:flex">
            <aside className="w-full h-full min-w-[250px] md:w-[45%] md:max-w-[480px] bg-[#1B262C]  md:border-[#3282B8] md:border-r">
                <Header currentUser={currentUser} />
                {isChatPage ? optionalComponent : children}
            </aside>
            {isChatPage ? children : <EmptyState />}
        </main>
    );
}

export default LayoutWrapper;
