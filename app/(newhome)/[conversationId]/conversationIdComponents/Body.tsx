'use client';

import {
    FullConversationType,
    FullMessageType,
} from '@/app/types/conversation';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './BodyComponents/MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/lib/pusher';
import { find } from 'lodash';

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
    const [messages, setMessages] = useState<FullMessageType[] | []>(
        conversation.messages
    );

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.post(`/api/messages/${conversationId}/seen`);
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();

        const newMessageHandler = (message: FullMessageType) => {
            axios.post(`/api/messages/${conversationId}/seen`);
            setMessages((prevData) => {
                if (find(prevData, { id: message.id })) {
                    return prevData;
                }
                return [...prevData, message];
            });
            bottomRef?.current?.scrollIntoView();
        };

        const updateMessagesHandler = (
            updatedUnseenMessages: FullMessageType[]
        ) => {
            setMessages((currentMessages) => {
                const updatedMessages = currentMessages.map(
                    (currentMessage) => {
                        const foundUpdatedMessage = updatedUnseenMessages?.find(
                            (message) => message.id === currentMessage.id
                        );
                        return foundUpdatedMessage
                            ? foundUpdatedMessage
                            : currentMessage;
                    }
                );
                return updatedMessages;
            });
        };

        pusherClient.bind('messages:new', newMessageHandler);
        pusherClient.bind('messages:update', updateMessagesHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', newMessageHandler);
            pusherClient.unbind('messages:update', updateMessagesHandler);
        };
    }, []);

    return (
        <div className="flex-1 w-full  py-2 overflow-y-auto">
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
                        conversation={conversation}
                    />
                ))}
                <div ref={bottomRef} className="pt-12"></div>
            </div>
        </div>
    );
};

export default ConversationScreenBody;
