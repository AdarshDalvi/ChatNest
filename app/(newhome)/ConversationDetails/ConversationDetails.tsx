import useConversation from '@/app/hooks/useConversation';

const ConversationDetails = () => {
    const { conversationId } = useConversation();
    if (!conversationId) {
        return null;
    }
    return <div>nice</div>;
};

export default ConversationDetails;
