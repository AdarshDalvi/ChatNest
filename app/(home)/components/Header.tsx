'use client';

import Avatar from '@/app/(home)/components/Avatar';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { useMemo, useState } from 'react';
import ProfileDrawer from './InfoDrawers/ProfileDrawer';
import NewGroupChatDrawer from './NewGroupChat/NewGroupChatDrawer';
import useMobileView from '@/app/hooks/useMobileView';
import useConversation from '@/app/hooks/useConversation';

import { FullChatType } from '@/app/types/conversation';
import Users from '../users/Users';
import Conversations from '../conversations/conversations';

interface HeaderProps {
    currentUser: User;
    users: User[];
    chats: FullChatType[];
}

export type HeaderNavOptions = 'CHATS' | 'PEOPLE';

type NavOption = {
    label: string;
    selected: HeaderNavOptions;
};

export default function Header({ currentUser, users, chats }: HeaderProps) {
    console.log(chats);
    const navOptions: NavOption[] = [
        {
            label: 'Chats',
            selected: 'CHATS',
        },
        {
            label: 'People',
            selected: 'PEOPLE',
        },
    ];

    const [showProfileDrawer, setShowProfileDrawer] = useState(false);
    const [showNewGroupChatDrawer, setShowNewshowNewGroupChatDrawer] =
        useState(false);

    const { mobileView } = useMobileView();
    const { conversationId, selectedPage, updateSelectedPage } =
        useConversation();

    const isMobileConversationOpen = useMemo(() => {
        return mobileView === true && conversationId !== null;
    }, [mobileView, conversationId]);

    return (
        <>
            <ProfileDrawer
                currentUser={currentUser}
                showProfileDrawer={showProfileDrawer}
                setShowProfileDrawer={setShowProfileDrawer}
            />
            <NewGroupChatDrawer
                users={users}
                showNewGroupChatDrawer={showNewGroupChatDrawer}
                setShowNewGroupChatDrawer={setShowNewshowNewGroupChatDrawer}
            />
            {!isMobileConversationOpen && (
                <header className="absolute min-w-[250px] top-0 left-0 w-full  md:w-[45%] md:max-w-[480px] flex flex-col text-white  pt-4 bg-primary md:border-borderColor md:border-r">
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
                                setShowNewshowNewGroupChatDrawer(true);
                            }}
                        />
                        <GoKebabHorizontal className="text-3xl lg:text-[2rem] rotate-90 cursor-pointer" />
                    </div>
                    <nav className="mt-8 relative flex justify-center text-center  text-lg md:text-xl font-medium tracking-wider">
                        {navOptions.map((option) => {
                            return (
                                <p
                                    key={option.label}
                                    className={clsx(
                                        'main-nav-item flex-1 cursor-pointer',
                                        selectedPage === option.selected &&
                                            'active'
                                    )}
                                    onClick={() =>
                                        updateSelectedPage(option.selected)
                                    }
                                >
                                    {option.label}
                                </p>
                            );
                        })}
                    </nav>
                </header>
            )}
            {selectedPage === 'CHATS' ? (
                <Conversations chats={chats} />
            ) : (
                <Users users={users} />
            )}
        </>
    );
}
