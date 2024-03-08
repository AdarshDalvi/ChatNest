'use client';

import { User } from '@prisma/client';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdOutlineGroupAdd } from 'react-icons/md';
import Avatar from './Avatar';
import { useState } from 'react';
import NewConversationDrawer from '../NewConversation/NewConversationDrawer';
import { FullConversationType } from '@/app/types/conversation';
import ListWrapper from './WrapperComponents/ListWrapper';
import ConversationList from '../conversationComponents/ConversationList';
import ProfileInfoDrawer from './Drawer/ProfileInfoDrawer';

type HeaderProps = {
    currentUser: User;
    users: User[];
    conversations: FullConversationType[];
};
const Header: React.FC<HeaderProps> = ({
    currentUser,
    users,
    conversations,
}) => {
    const [showNewConversationDrawer, setShowNewConversationDrawer] =
        useState<boolean>(false);
    const [showProfileDrawer, setShowProfileDrawer] = useState<boolean>(false);
    return (
        <>
            <NewConversationDrawer
                users={users}
                showNewConversationDrawer={showNewConversationDrawer}
                setShowNewConversationDrawer={setShowNewConversationDrawer}
            />
            <ProfileInfoDrawer
                currentUser={currentUser}
                showProfileDrawer={showProfileDrawer}
                setShowProfileDrawer={setShowProfileDrawer}
            />
            <header className="w-full flex flex-col text-white  pt-4 pb-4 bg-primary ">
                <div className="flex items-center mx-[1.6rem] gap-6">
                    <Avatar
                        avatarImg={currentUser}
                        status={false}
                        size="HEADER"
                        onClick={() => {
                            setShowProfileDrawer(true);
                        }}
                    />
                    <MdOutlineGroupAdd
                        className="ml-auto text-3xl lg:text-[2rem] cursor-pointer"
                        onClick={() => {
                            setShowNewConversationDrawer(true);
                        }}
                    />
                    <GoKebabHorizontal className="text-3xl  rotate-90 cursor-pointer" />
                </div>
            </header>
            {conversations.length < 1 ? (
                <div
                    className="flex flex-col justify-center items-center gap-4"
                    style={{ height: 'calc(100dvh - 60px)' }}
                >
                    <p className="text-2xl">No chats found! Start a new one.</p>
                    <button
                        className="bg-primary px-8 py-2 text-xl rounded-md"
                        onClick={() => {
                            setShowNewConversationDrawer(true);
                        }}
                    >
                        New chat
                    </button>
                </div>
            ) : (
                <ListWrapper height={'calc(100dvh - 60px)'}>
                    <ConversationList initialConversation={conversations} />
                </ListWrapper>
            )}
        </>
    );
};

export default Header;
