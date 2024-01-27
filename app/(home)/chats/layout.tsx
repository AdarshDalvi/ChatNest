import getChats from '@/app/actions/getChats';
import ListWrapper from '../components/ListWrapper';
import Wrapper from '../components/Wrapper';
import ChatList from './components/ChatList';

interface ChatLayoutProps {
    children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = async ({ children }) => {
    const chats = await getChats();
    return (
        <>
            <Wrapper>
                <ListWrapper>
                    <ChatList initialChats={chats} />
                </ListWrapper>
            </Wrapper>
            {children}
        </>
    );
};

export default ChatLayout;
