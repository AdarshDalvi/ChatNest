'use client';
import useConversation from '@/app/hooks/useConversation';
import useMobileView from '@/app/hooks/useMobileView';

export type WrapperProps = {
    children: React.ReactNode;
};
const PageWrapper: React.FC<WrapperProps> = ({ children }) => {
    const { mobileView } = useMobileView();
    const { conversationId } = useConversation();

    if (mobileView && conversationId) {
        return null;
    }
    return (
        <aside
            className="
            bg-secondary
            min-w-[250px]
            w-full
            md:w-[45%] md:max-w-[480px]
            flex
            flex-col
            md:border-borderColor md:border-r"
        >
            {children}
        </aside>
    );
};

export default PageWrapper;
