'use client';

import { FullChatType } from '@/app/types/conversation';
import { useEffect, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import { useSearchBox } from '@/app/hooks/useSearchBox';
import ConversationCard from './ConversationCard';
import SearchBox from '../components/SearchBox';

interface ConversationListProps {
    initialChats: FullChatType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialChats,
}) => {
    const [filteredChats, setFilteredChats] = useState(initialChats);
    const { chatId } = useConversation();

    const { searchText, updateSearchText, clearSearchText } = useSearchBox();

    useEffect(() => {
        const filterChats = () => {
            setFilteredChats((prevChats) => {
                if (searchText === '') {
                    return initialChats;
                }

                const updatedChats: FullChatType[] = filteredChats.filter(
                    (chat) => {
                        const sameName = chat.name
                            ?.toLowerCase()
                            .includes(searchText.toLowerCase());

                        return sameName;
                    }
                );

                return updatedChats;
            });
        };

        filterChats();
    }, [searchText, initialChats]);

    return (
        <>
            <SearchBox
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
                {filteredChats.map((chat, index, filteredChats) => (
                    <ConversationCard
                        key={chat.id}
                        chat={chat}
                        selected={chat.id === chatId}
                        lastElement={index === filteredChats.length - 1}
                    />
                ))}
            </div>
        </>
    );
};

export default ConversationList;
