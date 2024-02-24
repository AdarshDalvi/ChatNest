import useConversation from '@/app/hooks/useConversation';
import { FullChatType } from '@/app/types/conversation';
import ChatScreenHeader from './components/Header';
import ChatScreenBody from './components/Body';

type ConversationIdProps = {
    conversations: FullChatType[];
};
const ConversationId: React.FC<ConversationIdProps> = ({ conversations }) => {
    const { conversationId } = useConversation();
    if (!conversationId) return null;

    const conversation = conversations.filter(
        (conversation) => conversation.id === conversationId
    );
    return (
        <div className="flex-1 flex flex-col h-dvh min-w-[250px] relative">
            <ChatScreenHeader chat={conversation[0]} />
            <ChatScreenBody
                initialMessages={conversation[0]?.messages ?? []}
                isGroup={conversation[0].isGroup}
            />
        </div>
    );
};

export default ConversationId;
