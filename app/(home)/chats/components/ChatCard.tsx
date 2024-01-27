'use client';

import { FullChatType } from '@/app/types/conversation';
import CardWrapper from '../../components/CardWrapper';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Conversation, Message, User } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOther';
import { useSession } from 'next-auth/react';
import Avatar from '@/app/(home)/components/Avatar';
import clsx from 'clsx';
import messageTime from '@/app/lib/messageTime';
import { FaImage } from 'react-icons/fa6';

interface ChatCardProps {
    chat: FullChatType;
    selected?: boolean;
    lastElement: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat, selected, lastElement }) => {
    const otherUser = useOtherUser(chat);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/chats/${chat.id}`);
    }, [chat.id, router]);

    const lastMessage = useMemo(() => {
        const messages = chat.messages || [];
        const lastMessage = messages[messages.length - 1];
        return lastMessage;
    }, [chat.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user.email;
    }, [session.data?.user.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) return false;

        const seenArray = lastMessage.seen || [];
        if (!userEmail) return false;

        return (
            seenArray.filter((user) => user.email === userEmail).length !== 0
        );
    }, [lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return (
                <div className="flex gap-2 items-center">
                    <FaImage size={25} />
                    <p>Image</p>
                </div>
            );
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return chat.isGroup ? (
            <p style={{ color: '#9ca3af' }}>{`Created group ${chat.name}`}</p>
        ) : (
            <p style={{ color: '#9ca3af' }}>Started a conversation</p>
        );
    }, [lastMessage]);

    return (
        <CardWrapper
            handleClick={handleClick}
            selected={selected}
            lastElement={lastElement}
        >
            <div className="py-6">
                <Avatar user={otherUser} status={true} />
            </div>
            <div
                className={clsx(
                    'flex-1 flex flex-col gap-1 pr-6 justify-center border-t-[0.667px] border-[#2c4049] hover:border-none text-xl midPhones:text-2xl'
                )}
            >
                <div className="flex w-full justify-between">
                    <p>{chat.name || otherUser.name}</p>
                    {lastMessage?.createdAt && (
                        <p className="text-lg text-gray-400">
                            {messageTime(lastMessage.createdAt)}
                        </p>
                    )}
                </div>
                <div
                    className={clsx(
                        'text-lg midPhones:text-xl truncate',
                        hasSeen ? 'text-gray-500' : 'white'
                    )}
                >
                    {lastMessageText}
                </div>
            </div>
        </CardWrapper>
    );
};

export default ChatCard;
