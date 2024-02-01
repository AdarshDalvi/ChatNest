'use client';

import { User } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';

type AvatarSize = 'CARD' | 'CHATBOX' | 'HEADER' | 'INFO';

interface AvatarProps {
    user?: User;
    status: boolean;
    size: AvatarSize;
}
export default function Avatar({ user, status, size }: AvatarProps) {
    let avatarSize;

    if (size === 'CHATBOX') {
        avatarSize = 'w-7 h-7 midPhones:w-11 midPhones:h-11';
    } else if (size === 'HEADER') {
        avatarSize = 'w-14 h-14 midPhones:w-16 midPhones:h-16';
    } else {
        avatarSize = 'w-[40px] h-[40px] midPhones:w-[48px] midPhones:h-[48px]';
    }

    return (
        <div className={clsx('relative bg-gray-300 rounded-full', avatarSize)}>
            <Image
                src={user?.image || '/user.png'}
                alt={'User Image'}
                width={status ? 49 : 40}
                height={status ? 49 : 40}
                priority
                className="bg-gray-300 rounded-full w-full h-full"
            />
            {status && (
                <div
                    className={clsx(
                        `
                absolute 
                ring-cardHoverColor
                ring-1
                h-3 
                w-3
                bg-green-500 
                rounded-full
                top-1.5 right-1.5
                `
                    )}
                ></div>
            )}
        </div>
    );
}
