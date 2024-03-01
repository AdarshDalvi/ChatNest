// import { useParams } from 'next/navigation';
// import { useMemo } from 'react';

import { useContext } from 'react';
import { ConversationContext } from '../context/ConversationContext';

const useConversation = () => {
    const { conversationId, updateConversationId } =
        useContext(ConversationContext);
    return {
        conversationId,
        updateConversationId,
    };
    // const params = useParams();

    // const chatId = useMemo(() => {
    //     if (!params?.chatId) {
    //         return '';
    //     }

    //     return params.chatId as string;
    // }, [params?.chatId]);

    // const isOpen = useMemo(() => !!chatId, [chatId]);

    // return useMemo(
    //     () => ({
    //         isOpen,
    //         chatId,
    //     }),
    //     [isOpen, chatId]
    // );
};

export default useConversation;
