'use client';

import stopEventPropagation from '@/app/lib/stopEventPropagation';
import { Conversation, User } from '@prisma/client';
import { useMemo } from 'react';

import { GoKebabHorizontal } from 'react-icons/go';
import { IoArrowBack } from 'react-icons/io5';
import Avatar from '../../components/Avatar';
import useConversation from '@/app/hooks/useConversation';

interface ConversationScreenHeaderProps {
    conversation: Conversation & {
        users: User[];
    };
}

const ConversationScreenHeader: React.FC<ConversationScreenHeaderProps> = ({
    conversation,
}) => {
    const statusText = useMemo(() => {
        if (conversation?.isGroup) {
            return 'tap here for more info';
        }

        return 'online';
    }, [conversation]);

    const { updateConversationId } = useConversation();

    const handleNavigation = (event: any) => {
        stopEventPropagation(event);
        updateConversationId(null);
    };

    const handleContactInfoDrawer = () => {
        // setShowContactInfoDrawer((prevValue) => !prevValue);
    };

    const handleGroupInfoDrawer = () => {
        // setShowGroupInfoDrawer((prevValue) => !prevValue);
    };

    const handleMenuClick = (event: any) => {
        stopEventPropagation(event);
    };

    const avatarImg = conversation.image;

    return (
        <>
            <header
                className="flex py-4 pl-4 pr-3.5  items-center gap-2 bg-primary text-white cursor-pointer z-10"
                onClick={
                    !conversation.isGroup
                        ? handleContactInfoDrawer
                        : handleGroupInfoDrawer
                }
            >
                <IoArrowBack className="text-4xl" onClick={handleNavigation} />
                <Avatar avatarImg={avatarImg} status={false} size="HEADER" />
                <div className="flex-1 flex flex-col justify-center ml-2">
                    <p className="text-xl midPhones:text-2xl font-medium tracking-wide">
                        {conversation.name}
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

export default ConversationScreenHeader;
