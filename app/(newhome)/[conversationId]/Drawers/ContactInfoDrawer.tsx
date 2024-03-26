'use client';

import Drawer from '@/app/(newhome)/components/Drawer/Drawer';
import DrawerChildrenWrapper from '@/app/(newhome)/components/Drawer/DrawerChildrenWrapper';
import { Conversation, User } from '@prisma/client';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { MdClear } from 'react-icons/md';
import ViewOnlyImage from './components/ViewOnlyImage';
import { IoTrash } from 'react-icons/io5';
import { format } from 'date-fns';
import useModalDialog from '@/app/hooks/useModalDialog';
import ModalWrapper from '../../components/WrapperComponents/ModalWrapper';
import ConfirmationDialog from '../../components/DialogComponents/ConfirmationDialog';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ContactInfoDrawerProps {
    conversation: Conversation & {
        members: User[];
    };
    showContactInfoDrawer: boolean;
    setShowContactInfoDrawer: Dispatch<SetStateAction<boolean>>;
    otherUser: User;
}

const ContactInfoDrawer: React.FC<ContactInfoDrawerProps> = ({
    conversation,
    showContactInfoDrawer,
    setShowContactInfoDrawer,
    otherUser,
}) => {
    const closeContactDrawer = () => {
        setShowContactInfoDrawer(false);
    };

    const [loading, setLoading] = useState(false);
    const [modalDialogRef, openDialog, closeDialog] = useModalDialog();

    const router = useRouter();

    const confirmDeleteAction = useCallback(async () => {
        setLoading(true);
        try {
            const data = await axios.delete(
                `/api/single-chat/${conversation.id}`
            );
            console.log(data);
            router.replace('/');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            closeDialog();
            setLoading(false);
        }
    }, []);

    return (
        <Drawer
            icon={MdClear}
            drawerOrigin="origin-right"
            drawerHeading="Contact info"
            closeDrawer={closeContactDrawer}
            showDrawer={showContactInfoDrawer}
            disabled={loading}
        >
            <ModalWrapper ref={modalDialogRef}>
                <ConfirmationDialog
                    closeModal={closeDialog}
                    isLoading={loading}
                    modalHeading="Delete Chat"
                    modalMessage="Are you sure you want to delete this chat? This action
                        cannot be undone."
                    confirmAction={confirmDeleteAction}
                    confirmText={'Delete'}
                />
            </ModalWrapper>
            <DrawerChildrenWrapper>
                <ViewOnlyImage
                    imageSrc={otherUser.image}
                    fallbackImage="/user.png"
                />
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
            </DrawerChildrenWrapper>
        </Drawer>
    );
};

export default ContactInfoDrawer;
