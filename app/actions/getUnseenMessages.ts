import { useMemo } from 'react';
import { FullConversationType } from '../types/conversation';

const getUnseenMessages = (
    currentUserEmail: string | null | undefined,
    conversation: FullConversationType
) => {
    const unseenMessages = useMemo(() => {
        if (!currentUserEmail || conversation.messages.length < 1) return [];

        const unseenMesages = conversation.messages.filter((message) => {
            const isMessageSeen = message.seen.some(
                (seenUser) => seenUser.email === currentUserEmail
            );
            return !isMessageSeen;
        });

        return unseenMesages;
    }, [currentUserEmail, conversation.messages]);

    return unseenMessages;
};

export default getUnseenMessages;
