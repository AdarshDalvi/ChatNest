'use client';

import useConversation from '@/app/hooks/useConversation';
import useMobileView from '@/app/hooks/useMobileView';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    const { mobileView } = useMobileView();
    const { conversationId } = useConversation();

    if (mobileView && conversationId) {
        return null;
    }
    return (
        <aside
            className="
                text-white
                h-listHeightSmall
                midPhones:h-listHeight
                w-full
                min-w-[250px]
                mt-listMarginSmall
                midPhones:mt-listMargin
                md:w-[45%]
                md:max-w-[480px]
                bg-secondary
                md:border-borderColor
                md:border-r"
        >
            {children}
        </aside>
    );
};

export default PageWrapper;
