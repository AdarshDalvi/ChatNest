import useConversation from '@/app/hooks/useConversation';
import useUserSearch from '@/app/hooks/useUserSearch';
import { FullConversationType } from '@/app/types/conversation';
import { User } from '@prisma/client';
import { useEffect, useMemo, useState } from 'react';
import SearchBox from '../components/SearchBox';
import NoResultsFound from '../components/NoResultsFound';
import ConversationCard from './ConversationCard';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/lib/pusher';
import { find } from 'lodash';

interface ConversationListProps {
    conversationList: FullConversationType[];
    currentUser: User;
    users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    conversationList,
    currentUser,
    users,
}) => {
    const session = useSession();

    const [originalConversations, setOriginalConversations] = useState<
        FullConversationType[] | null
    >(null);
    const [filteredConversations, setFilteredConversations] =
        useState<FullConversationType[]>(conversationList);
    const { conversationId } = useConversation();
    const { searchText, updateSearchText, clearSearchText } = useUserSearch();

    const pusherKey = useMemo(() => {
        return session.data?.user.email;
    }, [session.data?.user.email]);

    useEffect(() => {
        const updatedConversations = conversationList.map((conversation) => {
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
    }, [conversationList]);

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

    useEffect(() => {
        if (pusherKey) {
            const newConversationHandler = (
                newConversation: FullConversationType
            ) => {
                let updatedNewConversation: FullConversationType = {
                    ...newConversation,
                };
                if (!newConversation.isGroup) {
                    const otherUser = newConversation.members.filter(
                        (member) => member.id !== currentUser.id
                    );
                    updatedNewConversation = {
                        ...newConversation,
                        name: otherUser[0].name,
                    };
                }

                setFilteredConversations((currentConversations) => {
                    if (
                        find(currentConversations, {
                            id: updatedNewConversation.id,
                        })
                    ) {
                        return currentConversations;
                    }
                    return [updatedNewConversation, ...currentConversations];
                });
                setOriginalConversations((currentOriginalConversations) => {
                    if (
                        find(currentOriginalConversations, {
                            id: updatedNewConversation.id,
                        })
                    ) {
                        return currentOriginalConversations;
                    }

                    if (currentOriginalConversations === null) {
                        return [newConversation];
                    }

                    return [newConversation, ...currentOriginalConversations];
                });
            };

            const updateConversationHandler = (
                conversation: FullConversationType
            ) => {
                setFilteredConversations((currentConversations) =>
                    currentConversations.map((currentConversation) => {
                        if (currentConversation.id === conversation.id) {
                            return {
                                ...currentConversation,
                                messages: conversation.messages,
                            };
                        }

                        return currentConversation;
                    })
                );
            };

            // const removeConversationHandler = (
            //     conversation: FullConversationType
            // ) => {
            //     setOriginalConversations((current) => {
            //         if (current !== null) {
            //             return [
            //                 ...current.filter(
            //                     (currentConversation) =>
            //                         currentConversation.id !== conversation.id
            //                 ),
            //             ];
            //         }

            //         return current;
            //     });

            //     setFilteredConversations((current) =>
            //         current.filter((convo) => convo.id !== conversation.id)
            //     );
            // };

            const groupUpdatehandler = (conversation: FullConversationType) => {
                setFilteredConversations((currentConversations) =>
                    currentConversations.map((currentConversation) => {
                        if (currentConversation.id === conversation.id) {
                            return {
                                ...currentConversation,
                                groupName: conversation.groupName,
                                groupDescription: conversation.groupDescription,
                                groupIcon: conversation.groupIcon,
                            };
                        }

                        return currentConversation;
                    })
                );
            };

            pusherClient.subscribe(pusherKey);
            pusherClient.bind('conversation:new', newConversationHandler);
            pusherClient.bind('conversation:update', updateConversationHandler);
            // pusherClient.bind('conversation:remove', removeConversationHandler);
            pusherClient.bind('conversation:group-update', groupUpdatehandler);

            return () => {
                pusherClient.unsubscribe(pusherKey);
                pusherClient.unbind('conversation:new', newConversationHandler);
                pusherClient.unbind(
                    'conversation:update',
                    updateConversationHandler
                );
                // pusherClient.unbind(
                //     'conversation:remove',
                //     removeConversationHandler
                // );
                pusherClient.unbind(
                    'conversation:group-update',
                    groupUpdatehandler
                );
            };
        }
    }, [originalConversations, pusherKey]);

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
