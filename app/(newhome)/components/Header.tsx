'use client';

import { User } from '@prisma/client';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdOutlineGroupAdd } from 'react-icons/md';
import Avatar from './Avatar';
import { useState } from 'react';
import NewConversationDrawer from '../NewConversation/NewConversationDrawer';

type HeaderProps = {
    currentUser: User;
    users: User[];
};
const Header: React.FC<HeaderProps> = ({ currentUser, users }) => {
    const [showNewConversationDrawer, setShowNewConversationDrawer] =
        useState<boolean>(false);
    return (
        <>
            <NewConversationDrawer
                users={users}
                showNewConversationDrawer={showNewConversationDrawer}
                setShowNewConversationDrawer={setShowNewConversationDrawer}
            />
            <header className="w-full flex flex-col text-white  pt-4 pb-4 bg-primary ">
                <div className="flex items-center mx-[1.6rem] gap-6">
                    <Avatar
                        avatarImg={currentUser}
                        status={false}
                        size="HEADER"
                        // onClick={() => {
                        //     setShowProfileDrawer(true);
                        // }}
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
        </>
    );
};

export default Header;
