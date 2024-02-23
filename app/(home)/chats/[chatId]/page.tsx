import ChatScreenHeader from './components/Header';
import ChatScreenBody from './components/Body';
import getChatDetailsById from '@/app/actions/getChatDetailsById';
import getMessages from '@/app/actions/getMessages';
import { getCurrentUser } from '@/app/actions/getUser';

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
        <main className="flex-1 flex flex-col h-dvh min-w-[250px] relative">
            <ChatScreenHeader chat={chatDetails} />
            <ChatScreenBody
                initialMessages={messages}
                isGroup={chatDetails.isGroup}
            />
        </main>
    );
};

export default ChatId;

// <main
//     className="
//         h-dvh
//         relative
//         flex-1
//         flex
//         flex-col
//         bg-white
//         min-w-[250px]
//         max-md:fixed
//         max-md:left-0
//         max-md:top-0
//         max-md:w-screen"
// >
//     <ChatScreenHeader chat={chatDetails} />

//     <ChatScreenBody
//         initialMessages={messages}
//         isGroup={chatDetails.isGroup}
//     />
// </main>
