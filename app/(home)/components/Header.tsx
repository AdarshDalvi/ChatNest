'use client';

import Avatar from '@/app/components/Avatar';
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
            key: 'cdasdxakcns',
            name: 'Friends',
            href: '/friends',
        },
        {
            key: 'ckcscass',
            name: 'People',
            href: '/people',
        },
    ];

    return (
        <div className="w-full flex flex-col  pt-4 bg-[#0F4C75]">
            <div className="flex items-center mx-[1.6rem]">
                <Avatar user={currentUser} />
                <GoKebabHorizontal className="text-[2rem] rotate-90 ml-auto text-white cursor-pointer" />
            </div>
            <nav className="mt-10 relative flex justify-center text-center  text-lg md:text-xl font-medium tracking-wider">
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
        </div>
    );
}
