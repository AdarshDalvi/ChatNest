import {
    FullConversationType,
    FullMessageType,
} from '@/app/types/conversation';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { TbChecks } from 'react-icons/tb';
import ImageText from './ImageMessage';
import Avatar from '@/app/(newhome)/components/Avatar';
import { useMemo } from 'react';

interface MessageBoxProps {
    message: FullMessageType;
    previousMessage: FullMessageType | null;
    isFirstMessage: boolean;
    isGroup: boolean;
    conversation: FullConversationType;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    message,
    previousMessage,
    isFirstMessage,
    isGroup,
    conversation,
}) => {
    const session = useSession();
    const isOwn = useMemo(() => {
        return session.data?.user.email === message.sender?.email;
    }, [session.data?.user.email]);

    const previousMessageSameUser = useMemo(() => {
        return previousMessage?.sender?.email === message.sender?.email;
    }, [previousMessage?.sender?.email, message?.sender?.email]);

    let alignment;

    let textImageContainer = '';

    if (isOwn) {
        alignment = 'self-end';
    } else {
        alignment = 'self-start';
    }

    let marginTop;

    if (isFirstMessage) {
        marginTop = 'mt-8';
        textImageContainer += isOwn
            ? 'pointyEdgeRight  rounded-tr-none'
            : 'pointyEdgeLeft rounded-tl-none';
    }

    if (previousMessageSameUser) {
        marginTop = 'mt-1.5';
    } else {
        marginTop = 'mt-4';
        textImageContainer += isOwn
            ? 'pointyEdgeRight  rounded-tr-none'
            : 'pointyEdgeLeft rounded-tl-none';
    }

    let displayUserName;
    if (!isOwn) {
        if (message.body && !previousMessageSameUser) {
            displayUserName = true;
        } else if (message.image) {
            displayUserName = true;
        } else {
            displayUserName = false;
        }
    }

    const seenList = (message.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.name);

    if (isGroup) {
        return (
            <div
                className={clsx(
                    `
                flex
                min-w-0
                max-w-[80%]
                text-white
                gap-3
                midPhones:gap-4`,
                    alignment,
                    marginTop
                )}
            >
                {!previousMessageSameUser ? (
                    <Avatar
                        avatarImg={message.sender}
                        status={false}
                        size="CHATBOX"
                    />
                ) : (
                    <div className="w-7 h-7 midPhones:w-11 midPhones:h-11"></div>
                )}
                <div
                    className={clsx(
                        `
                    relative
                    flex
                    flex-col
                    flex-1
                    bg-primary
                    rounded-xl`,
                        isOwn && '-order-1',
                        textImageContainer,
                        previousMessageSameUser ? '' : '',
                        message.body && 'pt-2.5 pb-3.5 pl-4 pr-3.5'
                    )}
                >
                    {displayUserName && (
                        <p
                            className={clsx(
                                `text-base midPhones:text-lg text-yellow-400`,
                                message.image && 'pl-2.5 pt-1.5'
                            )}
                        >
                            {message.sender?.name}
                        </p>
                    )}
                    {message.image ? (
                        <ImageText
                            isOwn={isOwn}
                            message={message}
                            seenList={seenList}
                        />
                    ) : (
                        <>
                            <div
                                className="whitespace-normal text-[14px] -mb-1"
                                style={{ overflowWrap: 'anywhere' }}
                            >
                                {message.body}
                            </div>
                            <div className="flex self-end -mb-3 gap-2">
                                <p className=" text-gray-400">
                                    {format(new Date(message.createdAt), 'p')}
                                </p>
                                {isOwn && (
                                    <TbChecks
                                        className={clsx(
                                            'text-2xl',
                                            seenList.length ===
                                                conversation.members.length - 1
                                                ? 'text-cyan-600'
                                                : 'text-gray-400'
                                        )}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            className={clsx(
                `
                flex
                min-w-0
                max-w-[85%]
                text-white
                midPhones:gap-4`,
                alignment,
                marginTop
            )}
        >
            <div
                className={clsx(
                    `
                    relative
                    flex
                    flex-col
                    flex-1
                    bg-primary
                    rounded-xl`,
                    isOwn && '-order-1',
                    textImageContainer,
                    previousMessageSameUser ? '' : '',
                    message.body && 'pt-2.5 pb-3.5 pl-4 pr-3.5'
                )}
            >
                {message.image ? (
                    <ImageText
                        message={message}
                        isOwn={isOwn}
                        seenList={seenList}
                    />
                ) : (
                    <>
                        <div
                            className="whitespace-normal text-[14px] -mb-1"
                            style={{ overflowWrap: 'anywhere' }}
                        >
                            {message.body}
                        </div>
                        <div className="flex self-end -mb-3 gap-2">
                            <p className=" text-gray-400">
                                {format(new Date(message.createdAt), 'p')}
                            </p>
                            {isOwn && (
                                <TbChecks
                                    className={clsx(
                                        'text-2xl',
                                        seenList.length > 0
                                            ? 'text-cyan-600'
                                            : 'text-gray-400'
                                    )}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MessageBox;
