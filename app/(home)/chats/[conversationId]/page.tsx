'use client';

import EmptyState from '@/app/components/EmptyState';
import useConversation from '@/app/hooks/useConversation';

export default function page() {
    const { isOpen } = useConversation();
    if (!isOpen) {
        return <EmptyState />;
    }

    return (
        <div className="h-full  text-black max-md:fixed max-md:top-0 max-md:bg-white max-md:w-screen ">
            this is useConversation
        </div>
    );
}
