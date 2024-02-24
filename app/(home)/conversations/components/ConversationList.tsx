'use client';

import SearchBox from '../../components/SearchBox';
import { FullChatType } from '@/app/types/conversation';
import { useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import ConversationCard from './ConversationCard';
import { useSearchBox } from '@/app/hooks/useSearchBox';

interface ConversationListProps {
    initialChats: FullChatType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialChats,
}) => {
    const [chats, setChats] = useState(initialChats);
    const { conversationId } = useConversation();

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
                    <ConversationCard
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

export default ConversationList;
