'use client';

import useConversation from '@/app/hooks/useConversation';

export default function EmptyState() {
    const { conversationId, selectedPage } = useConversation();
    if (conversationId && selectedPage === 'CHATS') {
        return null;
    }
    return (
        <div
            className="
            max-md:hidden 
            flex 
            flex-col 
            flex-1 
            h-dvh 
            justify-center 
            items-center 
            bg-primary
            font-semibold
            text-2xl
            lg:text-3xl
            tracking-wide
            text-white
            "
        >
            Select a chat or start a new conversation
        </div>
    );
}
