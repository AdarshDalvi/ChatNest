import ChatScreenInput from './ChatScreenInput';
import ChatScreenInputForm from './ChatScreenInputForm';

const ChatScreenBody = () => {
    return (
        <div className="flex-1 flex flex-col bg-secondary relative">
            <div className="bg-chatBody bg-fixed h-full w-full opacity-5 absolute left-0 top-0 z-0"></div>
            <div className="flex-1 "></div>
            <ChatScreenInputForm />
        </div>
    );
};

export default ChatScreenBody;
