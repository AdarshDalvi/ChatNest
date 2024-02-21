'use client';

import Avatar from '@/app/(home)/components/Avatar';
import ContactInfoDrawer from '@/app/(home)/components/InfoDrawers/ContactInfoDrawer';
import GroupInfoDrawer from '@/app/(home)/components/InfoDrawers/GroupInfoDrawer';
import useOtherUser from '@/app/hooks/useOther';
import stopEventPropagation from '@/app/lib/stopEventPropagation';
import { Conversation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { GoKebabHorizontal } from 'react-icons/go';
import { IoArrowBack } from 'react-icons/io5';

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

    const [showContactInfoDrawer, setShowContactInfoDrawer] = useState(false);
    const [showGroupInfoDrawer, setShowGroupInfoDrawer] = useState(false);

    const handleNavigation = (event: any) => {
        stopEventPropagation(event);
        router.push('/chats');
    };

    const handleContactInfoDrawer = () => {
        setShowContactInfoDrawer((prevValue) => !prevValue);
    };

    const handleGroupInfoDrawer = () => {
        setShowGroupInfoDrawer((prevValue) => !prevValue);
    };

    const handleMenuClick = (event: any) => {
        stopEventPropagation(event);
    };

    const avatarImg = chat.isGroup ? chat.image : otherUser;

    return (
        <>
            {!chat.isGroup ? (
                <ContactInfoDrawer
                    chat={chat}
                    otherUser={otherUser}
                    showContactInfoDrawer={showContactInfoDrawer}
                    setShowContactInfoDrawer={setShowContactInfoDrawer}
                />
            ) : (
                <GroupInfoDrawer
                    chat={chat}
                    showGroupInfoDrawer={showGroupInfoDrawer}
                    setShowGroupInfoDrawer={setShowGroupInfoDrawer}
                />
            )}
            <header
                className="flex py-4 pl-4 pr-3.5  items-center gap-2 bg-primary text-white cursor-pointer"
                onClick={
                    !chat.isGroup
                        ? handleContactInfoDrawer
                        : handleGroupInfoDrawer
                }
            >
                <IoArrowBack className="text-4xl" onClick={handleNavigation} />
                <Avatar avatarImg={avatarImg} status={false} size="HEADER" />
                <div className="flex-1 flex flex-col justify-center ml-2">
                    <p className="text-xl midPhones:text-2xl font-medium tracking-wide">
                        {chat.isGroup ? chat.name : otherUser.name}
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
