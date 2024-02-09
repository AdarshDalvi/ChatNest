'use client';

import SearchBox from '../../components/SearchBox';
import { FullChatType } from '@/app/types/conversation';
import { useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import ChatCard from './ChatCard';
import { useSearchBox } from '@/app/hooks/useSearchBox';

interface ChatListProps {
    initialChats: FullChatType[];
}

const ChatList: React.FC<ChatListProps> = ({ initialChats }) => {
    const [chats, setChats] = useState(initialChats);
    const { chatId } = useConversation();

    const { searchText, updateSearchText, clearSearchText } = useSearchBox();

    return (
        <>
            <SearchBox
                id="search-text"
                placeholder="Search or start a new chat"
                searchText={searchText}
                handleChange={updateSearchText}
                clearSearchText={clearSearchText}
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
