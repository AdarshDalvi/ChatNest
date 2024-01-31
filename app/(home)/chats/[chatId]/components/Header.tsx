'use client';

import Avatar from '@/app/(home)/components/Avatar';
import useOtherUser from '@/app/hooks/useOther';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useMemo } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { IoArrowBack } from 'react-icons/io5';
interface ChatScreenHeaderProps {
    chat: Conversation & {
        users: User[];
    };
}

const ChatScreenHeader: React.FC<ChatScreenHeaderProps> = ({ chat }) => {
    const otherUser = useOtherUser(chat);
    const statusText = useMemo(() => {
        if (chat?.isGroup) {
            return 'tap here for more info';
        }

        return 'online';
    }, [chat]);

    return (
        <header className="flex py-4 pl-4 pr-3.5  items-center gap-2 bg-primary text-white  ">
            <Link href={'/chats'}>
                <IoArrowBack className="text-4xl" />
            </Link>
            <Avatar user={otherUser} status={false} size="HEADER" />
            <div className="flex-1 flex flex-col justify-center ml-2">
                <p className="text-xl midPhones:text-2xl font-medium tracking-wide">
                    {otherUser.name}
                </p>
                <p className="text-lg tracking-wide">{statusText}</p>
            </div>
            <GoKebabHorizontal className="text-3xl rotate-90 cursor-pointer bg" />
        </header>
    );
};

export default ChatScreenHeader;
