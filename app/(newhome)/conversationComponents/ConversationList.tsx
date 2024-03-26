import useConversation from '@/app/hooks/useConversation';
import useUserSearch from '@/app/hooks/useUserSearch';
import { FullConversationType } from '@/app/types/conversation';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import NoResultsFound from '../components/NoResultsFound';
import ConversationCard from './ConversationCard';

interface ConversationListProps {
    initialConversation: FullConversationType[];
    currentUser: User;
    users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialConversation,
    currentUser,
    users,
}) => {
    const [originalConversations, setOriginalConversations] = useState<
        FullConversationType[] | null
    >(null);
    const [filteredConversations, setFilteredConversations] =
        useState<FullConversationType[]>(initialConversation);
    const { conversationId } = useConversation();
    const { searchText, updateSearchText, clearSearchText } = useUserSearch();

    useEffect(() => {
        const updatedConversations = initialConversation.map((conversation) => {
            if (!conversation.isGroup) {
                const otherUser = conversation.members.filter(
                    (member) => member.id !== currentUser.id
                );
                return {
                    ...conversation,
                    name: otherUser[0].name,
                };
            }
            return conversation;
        });
        setFilteredConversations(updatedConversations);
        setOriginalConversations((prevData) => updatedConversations);
    }, [initialConversation]);

    useEffect(() => {
        if (originalConversations) {
            const filterConversations = () => {
                setFilteredConversations((prevData) => {
                    if (searchText === '') {
                        return originalConversations;
                    }

                    // Filter conversations using the stored otherUsersMap
                    const updatedFilteredConversations =
                        originalConversations.filter(
                            (conversation: FullConversationType) => {
                                const lowerCaseSearchText =
                                    searchText.toLowerCase();
                                const conversationName = conversation.isGroup
                                    ? conversation.groupName
                                    : conversation.name;
                                const sameName = conversationName
                                    ?.toLowerCase()
                                    .includes(lowerCaseSearchText);
                                return sameName;
                            }
                        );

                    return updatedFilteredConversations;
                });
            };

            filterConversations();
        }
    }, [searchText]);

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
          flex-col
        "
                style={{ scrollbarGutter: 'stable' }}
            >
                {filteredConversations.length > 0 ? (
                    filteredConversations.map(
                        (conversation, index, filteredConversations) => (
                            <ConversationCard
                                key={conversation.id}
                                conversation={conversation}
                                selected={conversation.id === conversationId}
                                lastElement={
                                    index === filteredConversations.length - 1
                                }
                                users={users}
                            />
                        )
                    )
                ) : (
                    <NoResultsFound noResultText="No chats found" />
                )}
            </div>
        </>
    );
};

export default ConversationList;
