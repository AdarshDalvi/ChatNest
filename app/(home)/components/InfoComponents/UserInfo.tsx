'use client';

import { Conversation, User } from '@prisma/client';
import Image from 'next/image';
import { format } from 'date-fns';
import { IoTrash } from 'react-icons/io5';
import { useState } from 'react';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import useModalDialog from '@/app/hooks/useModalDialog';
import ConfirmationDialog from '../Modal/ConfirmationDialog';
import { useRouter } from 'next/navigation';

interface UserInfoProps {
    chat: Conversation & {
        users: User[];
    };
    otherUser: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ chat, otherUser }) => {
    const [isHovering, setIsHovering] = useState(false);

    const { openDialog, modalDialogRef, closeDialog } = useModalDialog();
    const router = useRouter();

    const confirmDeleteAction = () => {
        router.push('/chats');
    };

    return (
        <>
            <Modal ref={modalDialogRef}>
                <ConfirmationDialog
                    confirmAction={confirmDeleteAction}
                    closeModal={() => closeDialog()}
                    modalHeading="Delete Chat"
                    modalMessage="Are you sure you want to delete this chat? This action
                        cannot be undone."
                />
            </Modal>
            <div
                className="w-[30%] max-w-[200px] lg:max-w-[220px] relative rounded-full overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <Image
                    alt="Profile Picture"
                    src={otherUser.image || '/user.png'}
                    width={200}
                    height={200}
                    className="bg-gray-300  w-full"
                />

                <div
                    className={clsx(
                        `absolute cursor-pointer justify-center items-center inset-0 rounded-full bg-secondary z-10 bg-opacity-50`,
                        isHovering ? 'flex' : 'hidden'
                    )}
                >
                    <p className="text-sm smallMobiles:text-base midPhones:text-xl">
                        View Image
                    </p>
                </div>
            </div>
            <p className="text-xl smallMobiles:text-2xl midPhones:text-3xl lg:text-4xl mt-6">
                {otherUser.name}
            </p>
            <button
                className="flex flex-col items-center mt-4 gap-2 hover:opacity-80"
                onClick={() => openDialog()}
            >
                <IoTrash className="text-red-500 text-2xl midPhones:text-3xl lg:text-4xl" />
                <p className="text-sm smallMobiles:text-base midPhones:text-lg lg:text-xl">
                    Delete
                </p>
            </button>
            <div className="flex flex-col mt-8 self-start px-8 w-full gap-8">
                <div className="px-4 space-y-2">
                    <p className="text-gray-400 text-sm smallMobiles:text-base midPhones:text-lg lg:text-xl">
                        Email
                    </p>
                    <p className="text-base smallMobiles:text-lg midPhones:text-xl lg:text-2xl">
                        {otherUser.email}
                    </p>
                </div>
                <div className="w-full h-0.5 bg-cardBorder"></div>
                <div className="px-4 space-y-2">
                    <p className="text-gray-400 text-sm smallMobiles:text-base midPhones:text-lg lg:text-xl">
                        Joined
                    </p>
                    <p className="text-base smallMobiles:text-lg midPhones:text-xl lg:text-2xl">
                        {format(new Date(otherUser.createdAt), 'PP')}
                    </p>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
