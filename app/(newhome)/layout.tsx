import getChats from '../actions/getChats';
import { getCurrentUser } from '../actions/getUser';
import getUsers from '../actions/getUsers';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import ListWrapper from './components/WrapperComponents/ListWrapper';
import PageWrapper from './components/WrapperComponents/PageWrapper';
import ConversationList from './components/conversationComponents/ConversationList';

const layout = async () => {
    const currentUser = await getCurrentUser();
    const chats = await getChats();
    const users = await getUsers();

    return (
        <main className="flex relative w-full h-full max-w-[1600px] text-white">
            <PageWrapper>
                <Header currentUser={currentUser!} />
                <ListWrapper height={'calc(100dvh - 60px)'}>
                    <ConversationList initialChats={chats} />
                </ListWrapper>
            </PageWrapper>
            <EmptyState />
        </main>
    );
};

export default layout;
