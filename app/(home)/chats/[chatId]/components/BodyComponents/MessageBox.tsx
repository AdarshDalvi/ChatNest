import Avatar from '@/app/(home)/components/Avatar';
import { FullMessageType } from '@/app/types/conversation';
import clsx from 'clsx';
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
    const sameUserPreviousMessage =
        previousMessage?.sender?.email === message.sender.email;

    let alignment;

    let textImageContainer = 'rounded-xl';

    if (isOwn) {
        alignment = 'self-end';
    } else {
        alignment = 'self-start';
    }

    let marginTop;

    if (isFirstMessage) {
        marginTop = 'mt-8';
        textImageContainer += isOwn
            ? ' pointyEdgeRight  rounded-tr-none'
            : ' pointyEdgeLeft rounded-tl-none';
    }

    if (sameUserPreviousMessage) {
        marginTop = 'mt-1';
    } else {
        marginTop = 'mt-4';
        textImageContainer += isOwn
            ? ' pointyEdgeRight  rounded-tr-none'
            : ' pointyEdgeLeft rounded-tl-none';
    }

    if (isGroup) {
        return (
            <div
                className={clsx(
                    'flex max-w-[80%] min-w-0  gap-4 midPhones:gap-6 text-white',
                    alignment,
                    marginTop
                )}
            >
                {!sameUserPreviousMessage ? (
                    <Avatar
                        user={message.sender}
                        status={false}
                        size="CHATBOX"
                    />
                ) : (
                    <div className="w-7 h-7 midPhones:w-11 midPhones:h-11"></div>
                )}
                <p
                    className={clsx(
                        'flex-1 relative bg-primary break-words max-w-messageBoxWidthSmall midPhones:max-w-messageBoxWidth',
                        textImageContainer,
                        isOwn && '-order-1'
                    )}
                >
                    {message.body}
                </p>
            </div>
        );
    }

    return (
        <div
            className={clsx(
                `
                relative
                p-4
                text-white
                bg-primary
                max-w-[85%]
                midPhones:max-w-[75%]
                break-words`,
                marginTop,
                alignment,
                textImageContainer
            )}
        >
            {message.body && message.body}
            {message.image && (
                <Image
                    src={message.image}
                    height={40}
                    width={40}
                    alt="message-image"
                    className="w-auto h-auto"
                />
            )}
        </div>
    );
};

export default MessageBox;

// const seenList = (message.seen || [])
//     .filter((user) => user.email !== message?.sender?.email)
//     .map((user) => user.name)
//     .join(', ');

// if (isGroup) {
//     return <div>a group chat</div>;
// }
