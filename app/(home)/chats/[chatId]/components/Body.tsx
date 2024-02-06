'use client';

import { FullMessageType } from '@/app/types/conversation';
import Form from './Form';
import { useEffect, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import MessageBox from './BodyComponents/MessageBox';
import axios from 'axios';

interface ChatScreenBodyProps {
    isGroup: boolean | null;
    initialMessages: FullMessageType[];
}

const ChatScreenBody: React.FC<ChatScreenBodyProps> = ({
    initialMessages,
    isGroup = false,
}) => {
    const [messages, setMessages] = useState(initialMessages);

    const { chatId } = useConversation();

    useEffect(() => {
        axios.post(`/api/single-chat/${chatId}/seen`);
    }, [chatId]);

    return (
        <div
            id="chat-body"
            className="
                w-full
                bg-secondary
                flex
                flex-col
                relative"
        >
            <div className="bg-chatBody bg-fixed h-full w-full opacity-5 absolute left-0 top-0 z-0"></div>
            <div
                id="messages"
                className="
                    w-full
                    flex-1
                    px-4
                    midPhones:px-8
                    flex
                    flex-col
                    my-2
                    z-10
                    overflow-y-auto
                    "
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
            <Form />
        </div>
    );
};

export default ChatScreenBody;
