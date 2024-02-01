import getChats from '@/app/actions/getChats';
import ListWrapper from '../components/WrapperComponents/ListWrapper';
import Wrapper from '../components/WrapperComponents/Wrapper';
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
