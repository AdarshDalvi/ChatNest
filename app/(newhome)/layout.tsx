import getConversations from '../actions/getConversations';
import { getCurrentUser } from '../actions/getUser';
import getUsers from '../actions/getUsers';
import ConversationDetails from './ConversationDetails/ConversationDetails';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import PageWrapper from './components/WrapperComponents/PageWrapper';

const layout = async () => {
    const currentUser = await getCurrentUser();
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <main className="flex relative w-full h-full max-w-[1600px] text-white">
            <PageWrapper>
                <Header
                    currentUser={currentUser!}
                    users={users}
                    conversations={conversations}
                />
            </PageWrapper>
            <EmptyState />
            <ConversationDetails initialConversations={conversations} />
        </main>
    );
};

export default layout;
