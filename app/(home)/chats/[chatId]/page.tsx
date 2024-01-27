import ChatScreenHeader from './components/ChatScreenHeader';
import ChatScreenBody from './components/ChatScreenBody';
import getChatDetailsById from '@/app/actions/getChatDetailsById';
import getMessages from '@/app/actions/getMessages';

interface ChatIdParams {
    chatId: string;
}

const ChatId = async ({ params }: { params: ChatIdParams }) => {
    const chatDetails = await getChatDetailsById(params.chatId);
    const messages = await getMessages(params.chatId);

    if (!chatDetails) {
        return <div>no Conversation found</div>;
    }
    return (
        <main
            className="
            flex
            flex-col
            flex-1
            min-w-[200px]
            text-black
            max-md:fixed 
            max-md:left-0
            max-md:top-0
            max-md:w-screen
            max-md:h-screen"
        >
            <ChatScreenHeader chat={chatDetails} />
            <ChatScreenBody />
        </main>
    );
};

export default ChatId;
