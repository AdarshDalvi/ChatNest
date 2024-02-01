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

    const { chatId } = useConversation();
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
                id="list"
                className="
                    w-full
                    pr-2
                    overflow-y-auto  
                    flex-1 
                    flex
                    flex-col"
                style={{ scrollbarGutter: 'stable' }}
            >
                {chats.map((chat, index, chats) => (
                    <ChatCard
                        key={chat.id}
                        chat={chat}
                        selected={chat.id === chatId}
                        lastElement={index === chats.length - 1}
                    />
                ))}
            </div>
        </>
    );
};

export default ChatList;
