'use client';

import { createContext, useCallback, useState } from 'react';
import { HeaderNavOptions } from '../(home)/components/Header';

interface ConversationContextType {
    conversationId: string | null;
    updateConversationId: (conversationId: string | null) => void;
    selectedPage: HeaderNavOptions;
    updateSelectedPage: (page: HeaderNavOptions) => void;
}

const defaultValue: ConversationContextType = {
    conversationId: null,
    updateConversationId: () => {},
    selectedPage: 'CHATS',
    updateSelectedPage: () => {},
};

const ConversationContext = createContext(defaultValue);

interface ConnversationContextProviderProps {
    children: React.ReactNode;
}

const ConnversationContextProvider: React.FC<
    ConnversationContextProviderProps
> = ({ children }) => {
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [selectedPage, setSelctedPage] = useState<HeaderNavOptions>('CHATS');

    const updateSelectedPage = useCallback(
        (page: HeaderNavOptions) => {
            if (page === 'PEOPLE') setConversationId(null);
            setSelctedPage((prevValue) => page);
        },
        [selectedPage]
    );

    const updateConversationId = (conversationId: string | null) => {
        setConversationId((prevId) => conversationId);
    };
    return (
        <ConversationContext.Provider
            value={{
                conversationId,
                updateConversationId,
                selectedPage,
                updateSelectedPage,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

export { ConnversationContextProvider, ConversationContext };
