'use client';

import Avatar from '@/app/(home)/components/Avatar';
import GroupInfo from '@/app/(home)/components/InfoComponents/GroupInfo';
import UserInfo from '@/app/(home)/components/InfoComponents/UserInfo';
import SideModal from '@/app/(home)/components/Modal/SideModal';
import useOtherUser from '@/app/hooks/useOther';
import stopEventPropagation from '@/app/lib/stopEventPropagation';
import { Conversation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { GoKebabHorizontal } from 'react-icons/go';
import { IoArrowBack } from 'react-icons/io5';
import { MdClear } from 'react-icons/md';

interface ChatScreenHeaderProps {
    chat: Conversation & {
        users: User[];
    };
}

const ChatScreenHeader: React.FC<ChatScreenHeaderProps> = ({ chat }) => {
    const router = useRouter();
    const otherUser = useOtherUser(chat);
    const statusText = useMemo(() => {
        if (chat?.isGroup) {
            return 'tap here for more info';
        }

        return 'online';
    }, [chat]);

    const [showSideModal, setShowSideModal] = useState(false);

    const handleNavigation = (event: MouseEvent) => {
        stopEventPropagation(event);
        router.push('/chats');
    };

    const handleSideModal = () => {
        setShowSideModal((prevValue) => !prevValue);
    };

    const handleMenuClick = (event: MouseEvent) => {
        stopEventPropagation(event);
    };

    return (
        <>
            <SideModal
                modalHeading={chat.isGroup ? 'Group info' : 'Contact info'}
                showSideModal={showSideModal}
                modalOrigin="origin-right"
                setShowSideModal={handleSideModal}
                icon={MdClear}
            >
                {chat.isGroup ? (
                    <GroupInfo chat={chat} />
                ) : (
                    <UserInfo chat={chat} otherUser={otherUser} />
                )}
            </SideModal>
            <header
                className="flex py-4 pl-4 pr-3.5  items-center gap-2 bg-primary text-white cursor-pointer"
                onClick={handleSideModal}
            >
                <IoArrowBack className="text-4xl" onClick={handleNavigation} />
                <Avatar user={otherUser} status={false} size="HEADER" />
                <div className="flex-1 flex flex-col justify-center ml-2">
                    <p className="text-xl midPhones:text-2xl font-medium tracking-wide">
                        {otherUser.name}
                    </p>
                    <p className="text-lg tracking-wide">{statusText}</p>
                </div>
                <GoKebabHorizontal
                    className="text-3xl rotate-90 cursor-pointer"
                    onClick={handleMenuClick}
                />
            </header>
        </>
    );
};

export default ChatScreenHeader;
