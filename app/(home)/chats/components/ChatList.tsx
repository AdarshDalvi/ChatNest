'use client';

import SearchBox from '../../components/SearchBox';
import { FieldValues, useForm } from 'react-hook-form';
import { FullChatType } from '@/app/types/conversation';
import { useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import ChatCard from './ChatCard';

interface ChatListProps {
    initialChats: FullChatType[];
}

const ChatList: React.FC<ChatListProps> = ({ initialChats }) => {
    const { register, resetField, watch } = useForm<FieldValues>({
        defaultValues: {
            searchText: '',
        },
    });

    const [chats, setChats] = useState(initialChats);

    const { conversationId, isOpen } = useConversation();
    return (
        <>
            <SearchBox
                id="search-text"
                register={register}
                resetField={resetField}
                watchForm={watch}
                placeholder="Search or start a new chat"
            />
            <div
                className="flex-1 overflow-y-auto  pr-2 "
                style={{ scrollbarGutter: 'stable' }}
            >
                {chats.map((chat, index, chats) => (
                    <ChatCard
                        key={chat.id}
                        chat={chat}
                        selected={chat.id === conversationId}
                        lastElement={index === chats.length - 1}
                    />
                ))}
            </div>
        </>
    );
};

export default ChatList;
