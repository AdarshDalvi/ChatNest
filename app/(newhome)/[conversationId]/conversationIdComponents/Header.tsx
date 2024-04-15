'use client';

import stopEventPropagation from '@/app/lib/stopEventPropagation';
import { Conversation, User } from '@prisma/client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { GoKebabHorizontal } from 'react-icons/go';
import { IoArrowBack } from 'react-icons/io5';
import Avatar from '../../components/Avatar';
import { useRouter } from 'next/navigation';
import GroupInfoDrawer from '../Drawers/GroupInfoDrawer/GroupInfoDrawer';
import ContactInfoDrawer from '../Drawers/ContactInfoDrawer';
import useOtherUser from '@/app/hooks/useOther';
import useOptionsMenu from '@/app/hooks/useOptionsMenu';
import OptionsMenu, { Option } from '../../components/OptionsMenu';
import useModalDialog from '@/app/hooks/useModalDialog';
import ModalWrapper from '../../components/WrapperComponents/ModalWrapper';
import ConfirmationDialog from '../../components/DialogComponents/ConfirmationDialog';
import toast from 'react-hot-toast';
import axios from 'axios';
import { pusherClient } from '@/app/lib/pusher';
import { FullConversationType } from '@/app/types/conversation';

interface ConversationScreenHeaderProps {
    initialConversation: Conversation & {
        members: User[];
    };
    users: User[];
}

const ConversationScreenHeader: React.FC<ConversationScreenHeaderProps> = ({
    initialConversation,
    users,
}) => {
    const [conversation, setConversation] = useState(initialConversation);
    const statusText = useMemo(() => {
        if (conversation?.isGroup) {
            return 'tap here for more info';
        }

        return 'online';
    }, [conversation]);

    const router = useRouter();
    const [showContactInfoDrawer, setShowContactInfoDrawer] = useState(false);
    const [showGroupInfoDrawer, setShowGroupInfoDrawer] = useState(false);
    const [loading, setLoading] = useState(false);

    const otherUser = useOtherUser(conversation);

    const { ref, showOptionsMenu, toggleOptionsMenu } = useOptionsMenu();
    const [modalDialogRef, openDialog, closeDialog] = useModalDialog();

    useEffect(() => {
        const updateMemberHandler = (updatedMember: User) => {
            setConversation((currentConversation) => {
                return {
                    ...currentConversation,
                    members: currentConversation.members.map((member) => {
                        if (member.id === updatedMember.id) {
                            return updatedMember;
                        }
                        return member;
                    }),
                };
            });
        };

        const updateAdminsHandler = (newConversation: FullConversationType) => {
            setConversation((currentConversation) => {
                return {
                    ...currentConversation,
                    adminsIds: newConversation.adminsIds,
                };
            });
        };

        const updateMembersHandler = (
            newConversation: FullConversationType
        ) => {
            setConversation((currentConversation) => {
                return {
                    ...currentConversation,
                    memberIds: newConversation.memberIds,
                    members: newConversation.members,
                };
            });
        };

        pusherClient.subscribe(conversation.id);
        pusherClient.bind('member:update', updateMemberHandler);
        pusherClient.bind('conversation:admins', updateAdminsHandler);
        pusherClient.bind('conversation:members', updateMembersHandler);

        return () => {
            pusherClient.unsubscribe(conversation.id);
            pusherClient.unbind('member:update', updateMemberHandler);
            pusherClient.unbind('conversation:admins', updateAdminsHandler);
            pusherClient.unbind('conversation:members', updateMembersHandler);
        };
    }, []);

    const handleNavigation = (event: any) => {
        stopEventPropagation(event);
        router.push('/');
    };

    const handleContactInfoDrawer = () => {
        setShowContactInfoDrawer((prevValue) => !prevValue);
    };

    const handleGroupInfoDrawer = () => {
        setShowGroupInfoDrawer((prevValue) => !prevValue);
    };

    const handleMenuClick = (event: any) => {
        stopEventPropagation(event);
        toggleOptionsMenu();
    };

    const avatarImg = conversation.isGroup
        ? conversation.groupIcon
        : otherUser?.image;
    const conversationName = conversation.isGroup
        ? conversation.groupName
        : otherUser?.name;

    const optionsList: Option[] = [
        {
            name: conversation.isGroup
                ? 'Show group info'
                : 'Show contact info',
            onClick: conversation.isGroup
                ? handleGroupInfoDrawer
                : handleContactInfoDrawer,
        },
    ];

    const confirmDeleteAction = useCallback(async () => {
        setLoading(true);
        try {
            const data = await axios.delete(
                `/api/single-chat/${conversation.id}`
            );
            router.replace('/');
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            closeDialog();
            setLoading(false);
        }
    }, []);

    if (!conversation.isGroup) {
        optionsList.push({ name: 'Delete chat', onClick: openDialog });
    }

    return (
        <>
            {conversation.isGroup ? (
                <GroupInfoDrawer
                    showGroupInfoDrawer={showGroupInfoDrawer}
                    setShowGroupInfoDrawer={setShowGroupInfoDrawer}
                    conversation={conversation}
                    users={users}
                    setConversation={setConversation}
                />
            ) : (
                <ContactInfoDrawer
                    showContactInfoDrawer={showContactInfoDrawer}
                    setShowContactInfoDrawer={setShowContactInfoDrawer}
                    conversation={conversation}
                    otherUser={otherUser}
                />
            )}
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
            <header
                className="flex py-4 pl-4 pr-3.5  items-center gap-2 bg-primary text-white cursor-pointer z-10"
                onClick={
                    !conversation.isGroup
                        ? handleContactInfoDrawer
                        : handleGroupInfoDrawer
                }
            >
                <IoArrowBack className="text-4xl" onClick={handleNavigation} />
                <Avatar avatarImg={avatarImg} status={false} size="HEADER" />
                <div className="flex-1 flex flex-col justify-center ml-2">
                    <p className="text-xl midPhones:text-2xl font-medium tracking-wide">
                        {conversationName}
                    </p>
                    <p className="text-lg tracking-wide">{statusText}</p>
                </div>
                <div
                    onClick={handleMenuClick}
                    ref={ref}
                    className="relative text-3xl cursor-pointer z-40"
                >
                    <OptionsMenu
                        showOptionsMenu={showOptionsMenu}
                        optionsList={optionsList}
                        textPosition="text-start"
                        className="top-[130%] right-3 origin-top-right min-w-[180px]"
                    />
                    <GoKebabHorizontal className=" rotate-90 " />
                </div>
            </header>
        </>
    );
};

export default ConversationScreenHeader;
