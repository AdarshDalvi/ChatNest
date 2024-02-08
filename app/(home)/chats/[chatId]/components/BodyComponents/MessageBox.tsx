import Avatar from '@/app/(home)/components/Avatar';
import { FullMessageType } from '@/app/types/conversation';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { TbChecks } from 'react-icons/tb';
interface MessageBoxProps {
    message: FullMessageType;
    previousMessage: FullMessageType | null;
    isFirstMessage: boolean;
    isGroup: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    message,
    previousMessage,
    isFirstMessage,
    isGroup,
}) => {
    const session = useSession();
    const isOwn = session?.data?.user?.email === message?.sender?.email;
    const previousMessageSameUser =
        previousMessage?.sender?.email === message.sender.email;

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
        .map((user) => user.name)
        .join(', ');

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
                        user={message.sender}
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
                        message.image ? 'p-1.5' : 'pt-2.5 pb-3.5 pl-4 pr-3.5'
                    )}
                >
                    {displayUserName && (
                        <p
                            className={clsx(
                                `text-base midPhones:text-lg text-yellow-400`,
                                message.image && 'pl-2.5 pr-2 pb-3.5 pt-1.5'
                            )}
                        >
                            {message.sender.name}
                        </p>
                    )}
                    {message.image ? (
                        <div className="relative">
                            <Image
                                src={message.image.src}
                                height={288}
                                width={288}
                                alt="message-image"
                                className="rounded-lg"
                            />
                            <p className="absolute right-2.5 bottom-1.5 text-base midPhones:text-lg ">
                                {format(new Date(message.createdAt), 'p')}
                            </p>
                        </div>
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
                                {isOwn && <TbChecks className="text-2xl" />}
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
                    message.image ? 'p-1.5' : 'pt-2.5 pb-3.5 pl-4 pr-3.5'
                )}
            >
                {message.image ? (
                    <div className="relative">
                        <Image
                            src={message.image.src}
                            width={288}
                            height={288}
                            alt="message-image"
                            className="rounded-lg "
                        />
                        <div className="absolute flex right-2.5 bottom-1.5 gap-2">
                            <p className="text-base midPhones:text-lg">
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
                    </div>
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
