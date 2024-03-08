'use client';

import {
    FullConversationType,
    FullMessageType,
} from '@/app/types/conversation';
import { useEffect, useMemo, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import MessageBox from './BodyComponents/MessageBox';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import getUnseenMessages from '@/app/actions/getUnseenMessages';

interface ConversationScreenBodyProps {
    isGroup: boolean | null;
    conversation: FullConversationType;
    conversationId: string;
}

const ConversationScreenBody: React.FC<ConversationScreenBodyProps> = ({
    isGroup = false,
    conversation,
    conversationId,
}) => {
    const [messages, setMessages] = useState<FullMessageType[] | []>([]);
    const session = useSession();

    const cuurentUserEmail = useMemo(() => {
        return session.data?.user.email;
    }, [session.data?.user.email]);

    const unseenMessages = getUnseenMessages(cuurentUserEmail, conversation);
    useEffect(() => {
        const markMessagesAsSeen = () => {
            if (cuurentUserEmail && unseenMessages.length > 0) {
                axios.post(`/api/single-chat/${conversationId}/seen`);
            }
        };
        setMessages(conversation.messages);

        markMessagesAsSeen();
    }, [conversationId]);

    return (
        <div className="flex-1 w-full z-10 py-2 overflow-y-auto">
            <div
                id="messages"
                className="w-full h-full flex flex-col overflow-y-auto px-4 midPhones:px-8"
                style={{ scrollbarGutter: 'stable' }}
            >
                {messages.map((message, index, messages) => (
                    <MessageBox
                        key={message.id}
                        message={message}
                        previousMessage={
                            index !== 0 ? messages[index - 1] : null
                        }
                        isGroup={isGroup!}
                        isFirstMessage={index === 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConversationScreenBody;
