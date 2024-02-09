import getChats from '@/app/actions/getChats';
import ListWrapper from '../components/WrapperComponents/ListWrapper';
import PageWrapper from '../components/WrapperComponents/PageWrapper';
import ChatList from './components/ChatList';

interface ChatLayoutProps {
    children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = async ({ children }) => {
    const chats = await getChats();
    return (
        <>
            <PageWrapper>
                <ListWrapper>
                    <ChatList initialChats={chats} />
                </ListWrapper>
            </PageWrapper>
            {children}
        </>
    );
};

export default ChatLayout;
