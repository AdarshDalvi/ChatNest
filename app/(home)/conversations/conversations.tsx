import React from 'react';
import PageWrapper from '../components/WrapperComponents/PageWrapper';
import EmptyState from '../components/EmptyState';
import { FullChatType } from '@/app/types/conversation';
import ListWrapper from '../components/WrapperComponents/ListWrapper';
import ConversationList from './components/ConversationList';
import ConversationId from './conversationId/conversationId';
import { User } from 'next-auth';

type ChatsPageProps = {
    chats: FullChatType[];
};

const ChatsPage: React.FC<ChatsPageProps> = ({ chats }) => {
    return (
        <main className="flex w-full h-full">
            <PageWrapper>
                <ListWrapper>
                    <ConversationList initialChats={chats} />
                </ListWrapper>
            </PageWrapper>
            <EmptyState />
            <ConversationId conversations={chats} />
        </main>
    );
};

export default ChatsPage;
