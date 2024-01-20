'use client';

import { createContext, useState } from 'react';

interface ConversationContextType {
    conversationId: string | null;
    updateConversationId: (conversationId: string | null) => void;
}

const defaultValue: ConversationContextType = {
    conversationId: null,
    updateConversationId: () => {},
};

const ConversationContext = createContext(defaultValue);

interface ConnversationContextProviderProps {
    children: React.ReactNode;
}

const ConnversationContextProvider: React.FC<
    ConnversationContextProviderProps
> = ({ children }) => {
    const [conversationId, setConversationId] = useState<string | null>(null);

    const updateConversationId = (conversationId: string | null) => {
        setConversationId((prevId) => conversationId);
    };
    return (
        <ConversationContext.Provider
            value={{ conversationId, updateConversationId }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

export { ConnversationContextProvider, ConversationContext };
