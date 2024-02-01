import Avatar from '@/app/(home)/components/Avatar';
import { FullMessageType } from '@/app/types/conversation';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

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
        marginTop = 'mt-1';
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
                <Avatar user={message.sender} status={false} size="CHATBOX" />
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
                {message.image && (
                    <div className="relative">
                        <Image
                            src={message.image}
                            height={300}
                            width={300}
                            alt="message-image"
                            className="rounded-lg"
                        />
                        <p className="absolute right-2.5 bottom-1.5 text-base midPhones:text-lg ">
                            {format(new Date(message.createdAt), 'p')}
                        </p>
                    </div>
                )}
                {
                    <div
                        className="whitespace-normal text-lg midPhones:text-xl relative"
                        style={{ overflowWrap: 'anywhere' }}
                    >
                        {message.body}
                    </div>
                }
                {/* {!isOwn && !sameUserPreviousMessage && (
                    <p
                        className={clsx(
                            'text-xl leading-4 text-yellow-400 pl-2.5 pr-2 pb-3.5 pt-1.5'
                        )}
                    >
                        {message.sender.name}
                    </p>
                )}
                {message.image ? (
                    <div className="relative">
                        <Image
                            src={message.image}
                            height={300}
                            width={300}
                            alt="message-image"
                            className="rounded-xl"
                        />
                    </div>
                ) : (
                    <p
                        className="whitespace-normal text-xl "
                        style={{ overflowWrap: 'anywhere' }}
                    >
                        {message.body}
                    </p>
                )} */}
                {/* <div
                    className={clsx(`
                    whitespace-normal
                    text-xl
                    `)}
                    style={{ overflowWrap: 'anywhere' }}
                > */}
                {/* {message.body && message.body} */}
                {/* {message.image && (
                        <Image
                            src={message.image}
                            height={288}
                            width={288}
                            alt="message-image"
                            className="rounded-xl"
                        />
                    )} */}
                {/* </div> */}
                {/* <div>{format(new Date(message.createdAt), 'p')}</div> */}
            </div>
        </div>
    );
    // }

    // return (
    //     <div
    //         className={clsx(
    //             `
    //             relative
    //             text-white
    //             bg-primary
    //             max-w-[85%]
    //             midPhones:max-w-[75%]
    //             break-words`,
    //             marginTop,
    //             alignment,
    //             textImageContainer,
    //             message.image ? 'rounded-2xl p-1.5' : 'rounded-xl p-4'
    //         )}
    //     >
    //         {message.body && message.body}
    //         {message.image && (
    //             <Image
    //                 src={message.image}
    //                 height={288}
    //                 width={288}
    //                 alt="message-image"
    //                 className="rounded-xl"
    //             />
    //         )}
    //     </div>
    // );
};

export default MessageBox;

// const seenList = (message.seen || [])
//     .filter((user) => user.email !== message?.sender?.email)
//     .map((user) => user.name)
//     .join(', ');

// if (isGroup) {
//     return <div>a group chat</div>;
// }
