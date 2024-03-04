'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
type ReactQueryProviderProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
    children,
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
