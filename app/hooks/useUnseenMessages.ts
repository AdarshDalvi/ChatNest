import { useMemo } from 'react';
import { FullMessageType } from '../types/conversation';

const useUnseenMessages = (
    currentUserEmail: string | null | undefined,
    messages: FullMessageType[]
) => {
    const unseenMessages = useMemo(() => {
        if (!currentUserEmail || messages?.length < 1) return [];

        const unseenMesages = messages?.filter((message) => {
            const isMessageSeen = message.seen.some(
                (seenUser) => seenUser.email === currentUserEmail
            );
            return !isMessageSeen;
        });

        return unseenMesages;
    }, [currentUserEmail, messages]);

    return unseenMessages;
};

export default useUnseenMessages;
