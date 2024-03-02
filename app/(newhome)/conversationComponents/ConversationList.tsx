'use client';

import { FullConversationType } from '@/app/types/conversation';
import { useEffect, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import { useSearchBox } from '@/app/hooks/useSearchBox';
import ConversationCard from './ConversationCard';
import SearchBox from '../components/SearchBox';

interface ConversationListProps {
    initialConversation: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialConversation,
}) => {
    const [filteredConversations, setFilteredConversations] =
        useState(initialConversation);
    const { conversationId } = useConversation();

    const { searchText, updateSearchText, clearSearchText } = useSearchBox();

    useEffect(() => {
        const filterConversations = () => {
            setFilteredConversations((prevConversations) => {
                if (searchText === '') {
                    return initialConversation;
                }

                const updatedConversations: FullConversationType[] =
                    filteredConversations.filter((chat) => {
                        const sameName = chat.name
                            ?.toLowerCase()
                            .includes(searchText.toLowerCase());

                        return sameName;
                    });

                return updatedConversations;
            });
        };

        filterConversations();
    }, [searchText, initialConversation]);

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
                {filteredConversations.map(
                    (chat, index, filteredConversations) => (
                        <ConversationCard
                            key={chat.id}
                            chat={chat}
                            selected={chat.id === conversationId}
                            lastElement={
                                index === filteredConversations.length - 1
                            }
                        />
                    )
                )}
            </div>
        </>
    );
};

export default ConversationList;
