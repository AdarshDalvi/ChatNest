'use client';

import Avatar from '@/app/(home)/components/Avatar';
import { User } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoKebabHorizontal } from 'react-icons/go';

interface HeaderProps {
    currentUser: User;
}

export default function Header({ currentUser }: HeaderProps) {
    const pathname = usePathname();
    const links = [
        {
            key: 'cknskcns',
            name: 'Chats',
            href: '/chats',
        },
        {
            key: 'ckcscass',
            name: 'People',
            href: '/people',
        },
    ];

    return (
        <header className="absolute top-0 left-0 w-full  md:w-[45%] md:max-w-[480px] flex flex-col  pt-4 bg-primary md:border-borderColor md:border-r">
            <div className="flex items-center mx-[1.6rem]">
                <Avatar user={currentUser} status={false} size="HEADER" />
                <GoKebabHorizontal className="text-[2.2rem] rotate-90 ml-auto text-white cursor-pointer" />
            </div>
            <nav className="mt-8 relative flex justify-center text-center  text-lg md:text-xl font-medium tracking-wider">
                {links.map((link) => {
                    const isActive = pathname.includes(link.href);
                    return (
                        <Link
                            key={link.key}
                            href={link.href}
                            className={clsx(
                                `main-nav-item flex-1 cursor-pointer`,
                                isActive && 'active '
                            )}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
