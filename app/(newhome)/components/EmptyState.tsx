'use client';
import useConversation from '@/app/hooks/useConversation';

const EmptyState = () => {
    const { conversationId } = useConversation();

    if (conversationId) {
        return null;
    }
    return (
        <div
            className="max-md:hidden 
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
            tracking-wide"
        >
            Select a chat or start a new conversation
        </div>
    );
};

export default EmptyState;
