import { Conversation, User, Message } from '@prisma/client';

export type FullMessageType = Message & {
    sender: User;
    seen: User[];
};

export type FullChatType = Conversation & {
    users: User[];
    messages: FullMessageType[];
};
