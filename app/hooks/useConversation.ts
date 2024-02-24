import { useContext, useMemo } from 'react';
import { ConversationContext } from '../context/ConversationContext';

const useConversation = () => {
    const {
        conversationId,
        updateConversationId,
        selectedPage,
        updateSelectedPage,
    } = useContext(ConversationContext);

    return {
        conversationId,
        updateConversationId,
        selectedPage,
        updateSelectedPage,
    };
};

export default useConversation;
