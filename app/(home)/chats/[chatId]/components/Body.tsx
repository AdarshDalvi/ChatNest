'use client';

import { FullMessageType } from '@/app/types/conversation';
import Form from './Form';
import { useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import MessageBox from './BodyComponents/MessageBox';

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
// <div
//     className="w-full flex flex-col bg-secondary relative"
//     style={{ height: 'calc(100% - 60px)' }}
// >
//     <div className="bg-chatBody bg-fixed h-full w-full opacity-5 absolute left-0 top-0 z-0"></div>
//     <div
//         className="
//             messages
//             w-full
//             flex-grow
//             my-2
//             flex flex-col px-4 midPhones:px-8 overflow-y-auto
//             z-20
//         "
//     ></div>
//     <Form />
// </div>

{
    /* {messages.map((message, index, messages) => (
    <MessageBox
        key={message.id}
        message={message}
        previousMessage={
            index !== 0 ? messages[index - 1] : null
        }
        isGroup={isGroup!}
        isFirstMessage={index === 0}
    />
))} */
}
