'use client';

import { User } from '@prisma/client';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdOutlineGroupAdd } from 'react-icons/md';
import Avatar from './Avatar';
import { useEffect, useState } from 'react';
import NewConversationDrawer from '../NewConversation/NewConversationDrawer';
import { FullConversationType } from '@/app/types/conversation';
import ListWrapper from './WrapperComponents/ListWrapper';
import ConversationList from '../conversationComponents/ConversationList';
import ProfileInfoDrawer from './Drawer/ProfileInfoDrawer';
import OptionsMenu, { Option } from './OptionsMenu';
import { signOut } from 'next-auth/react';
import useOptionsMenu from '@/app/hooks/useOptionsMenu';
import ConfirmationDialog from './DialogComponents/ConfirmationDialog';
import ModalWrapper from './WrapperComponents/ModalWrapper';
import useModalDialog from '@/app/hooks/useModalDialog';
import { pusherClient } from '@/app/lib/pusher';
import { find } from 'lodash';

type HeaderProps = {
    initialCurrentUser: User;
    users: User[];
    conversations: FullConversationType[];
};
const Header: React.FC<HeaderProps> = ({
    initialCurrentUser,
    users,
    conversations,
}) => {
    const [showNewConversationDrawer, setShowNewConversationDrawer] =
        useState<boolean>(false);
    const [showProfileDrawer, setShowProfileDrawer] = useState<boolean>(false);

    const { ref, showOptionsMenu, toggleOptionsMenu } = useOptionsMenu();

    const [modalDialogRef, openDialog, closeDialog] = useModalDialog();

    const [currentUser, setCurrentUser] = useState<User>(initialCurrentUser);

    const optionsList: Option[] = [
        {
            name: 'Profile',
            onClick: () => setShowProfileDrawer(true),
        },
        {
            name: 'Delete Chats',
            onClick: () => {},
        },
        {
            name: 'Log out',
            onClick: openDialog,
        },
    ];

    const filteredUsers = users.filter((user) => user.id !== currentUser.id);

    const [conversationList, setConversationList] =
        useState<FullConversationType[]>(conversations);

    useEffect(() => {
        if (!initialCurrentUser?.email) {
            return;
        }

        const removeConversationHandler = (
            conversation: FullConversationType
        ) => {
            setConversationList((currentConversationList) =>
                currentConversationList.filter(
                    (currentConversation) =>
                        currentConversation.id !== conversation.id
                )
            );
        };
        pusherClient.subscribe(initialCurrentUser.email);
        // pusherClient.bind('conversation:new', newConversationHandler);
        pusherClient.bind('conversation:remove', removeConversationHandler);

        return () => {
            if (initialCurrentUser.email)
                pusherClient.unsubscribe(initialCurrentUser.email);
            // pusherClient.bind('conversation:new', newConversationHandler);
            pusherClient.bind('conversation:remove', removeConversationHandler);
        };
    }, [initialCurrentUser?.email]);

    return (
        <>
            <NewConversationDrawer
                users={filteredUsers}
                showNewConversationDrawer={showNewConversationDrawer}
                setShowNewConversationDrawer={setShowNewConversationDrawer}
            />
            <ProfileInfoDrawer
                currentUser={currentUser}
                showProfileDrawer={showProfileDrawer}
                setCurrentUser={setCurrentUser}
                setShowProfileDrawer={setShowProfileDrawer}
            />
            <ModalWrapper ref={modalDialogRef}>
                <ConfirmationDialog
                    closeModal={closeDialog}
                    modalHeading="Log out?"
                    modalMessage="Are you sure you want to log out?"
                    confirmAction={() => signOut()}
                    isLoading={false}
                    confirmText="Log out"
                    accent
                />
            </ModalWrapper>
            <header className="w-full flex flex-col text-white  pt-4 pb-4 bg-primary">
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
                    <div
                        className="text-3xl cursor-pointer  relative"
                        ref={ref}
                        onClick={toggleOptionsMenu}
                    >
                        <OptionsMenu
                            optionsList={optionsList}
                            showOptionsMenu={showOptionsMenu}
                            className="top-[130%] right-3 origin-top-right min-w-[140px]"
                            textPosition="text-start"
                        />
                        <GoKebabHorizontal className="rotate-90" />
                    </div>
                </div>
            </header>
            {conversationList.length < 1 ? (
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
                    <ConversationList
                        conversationList={conversationList}
                        currentUser={currentUser}
                        users={users}
                    />
                </ListWrapper>
            )}
        </>
    );
};

export default Header;
