'use client';

import Drawer from '@/app/(newhome)/components/Drawer/Drawer';
import DrawerChildrenWrapper from '@/app/(newhome)/components/Drawer/DrawerChildrenWrapper';
import EditableNoImage from '@/app/(newhome)/components/ImageComponents/EditableNoImage';
import InfoImage from '@/app/(newhome)/components/ImageComponents/InfoImage';
import { Conversation, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { MdClear, MdOutlineModeEditOutline, MdSearch } from 'react-icons/md';
import ViewOnlyImage from './components/ViewOnlyImage';
import SaveCancelButtons from '../../components/SaveCancelButtons';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import GroupMemberCard from './components/GroupMemberCard';

import { IoExitOutline, IoPersonAdd } from 'react-icons/io5';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa6';
import clsx from 'clsx';
import useModalDialog from '@/app/hooks/useModalDialog';
import ModalWrapper from '../../components/WrapperComponents/ModalWrapper';
import NewMemberModal from './components/NewMemberModal';

interface GroupInfoDrawerProps {
    conversation: Conversation & {
        members: User[];
    };
    showGroupInfoDrawer: boolean;
    setShowGroupInfoDrawer: Dispatch<SetStateAction<boolean>>;
    users: User[];
}

const GroupInfoDrawer: React.FC<GroupInfoDrawerProps> = ({
    conversation,
    showGroupInfoDrawer,
    setShowGroupInfoDrawer,
    users,
}) => {
    const session = useSession();
    const [loading, setLoading] = useState(false);
    const [conversationImage, setConversationImage] = useState<string | null>(
        conversation.image
    );
    const [editname, setEditname] = useState(false);
    const [tempGroupMembers, setTempGroupMember] = useState<User[]>([]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        trigger,
        reset,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            name: conversation.name,
            members: conversation.members,
            image: conversation.image,
        },
    });

    const members: User[] = watch('members');

    const currentUser = useMemo(() => {
        return session.data?.user;
    }, [session.data?.user]);

    const isCurrentUserAdmin = useMemo(() => {
        if (!currentUser) return false;
        const isAdmin = conversation.adminsIds.some(
            (adminUserId) => adminUserId === currentUser.id
        );
        return isAdmin;
    }, [currentUser]);

    const closeGroupInfoDrawer = () => {
        reset();
        setShowGroupInfoDrawer(false);
        if (editname) {
            setEditname(false);
        }
    };

    const groupMembers = useMemo(() => {
        if (!currentUser || !currentUser.id) {
            return [];
        }
        const currentUserGroupMember = members.find(
            (user) => user.id === currentUser.id
        );
        currentUserGroupMember!.name = 'You';
        const groupMembersWithoutCurrentUser = members.filter(
            (user) => user.id !== currentUser.id
        );

        const updatedGroupMembers = [
            currentUserGroupMember,
            ...groupMembersWithoutCurrentUser,
        ];
        return updatedGroupMembers;
    }, [currentUser, members]);

    const updateGroup: SubmitHandler<FieldValues> = async (
        data
    ): Promise<boolean> => {
        try {
            const response = await axios.patch(
                `/api/group-chat/${conversation.id}`,
                data
            );
            return response.status === 200;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const updateGroupName = async () => {
        const isValid = await trigger('name', { shouldFocus: true });
        if (isValid) {
            setEditname(false);
        }
    };

    const { modalDialogRef, openDialog, closeDialog } = useModalDialog();
    return (
        <>
            <ModalWrapper ref={modalDialogRef} clickOutsideToClose>
                <NewMemberModal
                    closeDialog={closeDialog}
                    nonGroupMembers={users.filter(
                        (user) =>
                            !groupMembers.some(
                                (groupMember) => groupMember?.id === user.id
                            )
                    )}
                />
            </ModalWrapper>
            <Drawer
                icon={MdClear}
                drawerOrigin="origin-right"
                drawerHeading="Group info"
                closeDrawer={closeGroupInfoDrawer}
                showDrawer={showGroupInfoDrawer}
                disabled={loading}
            >
                <DrawerChildrenWrapper>
                    {isCurrentUserAdmin ? (
                        conversationImage === null ? (
                            <EditableNoImage
                                defaultImage="/group.png"
                                textOverImage="ADD GROUP ICON"
                                setImage={setConversationImage}
                            />
                        ) : (
                            <InfoImage
                                fallbackImage="/group.png"
                                imageSrc={conversationImage}
                                overImageText="CHANGE GROUP ICON"
                                setImage={setConversationImage}
                            />
                        )
                    ) : (
                        <ViewOnlyImage
                            imageSrc={conversationImage}
                            fallbackImage="/group.png"
                            isGroup
                        />
                    )}
                    {isCurrentUserAdmin &&
                        conversationImage !== conversation.image && (
                            <SaveCancelButtons
                                saveUpdate={() => {}}
                                cancelUpdate={() =>
                                    setConversationImage(
                                        (prevImage) => conversation.image
                                    )
                                }
                            />
                        )}
                    {!editname ? (
                        <div className="flex justify-center w-full text-3xl midPhones:text-[2rem] mt-2">
                            <div className="relative flex items-center">
                                <p>{conversation.name}</p>
                                {isCurrentUserAdmin && (
                                    <button
                                        className="absolute -right-12 bottom-1"
                                        onClick={() => setEditname(true)}
                                    >
                                        <MdOutlineModeEditOutline />
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="w-[70%] relative mt-4">
                                <input
                                    {...register('name', {
                                        required: `Group name can't be empty!`,
                                    })}
                                    placeholder="Enter group name"
                                    spellCheck={false}
                                    className={clsx(
                                        'w-full outline-none bg-secondary text-2xl midPhones:text-[1.7rem] pb-2.5 border-b-2 border-b-gray-400 focus:border-cyan-500',
                                        errors &&
                                            errors['name'] &&
                                            'focus:border-red-500'
                                    )}
                                    maxLength={30}
                                />
                                <button
                                    className="absolute bottom-3.5 midPhones:bottom-2.5  right-0 text-3xl midPhones:text-4xl  "
                                    onClick={updateGroupName}
                                >
                                    <FaCheck />
                                </button>
                            </div>
                            {errors && errors['name']?.message && (
                                <p className="text-red-500 text-lg text-start w-[70%]">
                                    {errors['name'].message.toString()}
                                </p>
                            )}
                        </>
                    )}

                    {isCurrentUserAdmin && (
                        <div className="px-8 w-full mt-16">
                            <button
                                onClick={openDialog}
                                type="button"
                                className="w-full flex hover:bg-cardHoverColor gap-6 items-center text-2xl py-4 px-3"
                            >
                                <div className="text-4xl bg-primary p-3.5 rounded-full">
                                    <IoPersonAdd />
                                </div>
                                <p>Add member</p>
                            </button>
                        </div>
                    )}
                    {groupMembers && groupMembers.length > 0 && (
                        <div className="flex flex-col w-full px-8">
                            <div className="flex justify-between">
                                <p className="text-xl midPhones:text-2xl">
                                    {conversation.members.length} members
                                </p>
                                <button type="button" className="text-3xl">
                                    <MdSearch />
                                </button>
                            </div>
                            <div className="flex flex-col  min-w-0 mt-8">
                                {groupMembers
                                    .slice(0, 10)
                                    .map((member, index) => {
                                        const isMemberAdmin =
                                            conversation.adminsIds.findIndex(
                                                (adminId) =>
                                                    adminId === member!.id
                                            ) !== -1;

                                        return (
                                            <GroupMemberCard
                                                key={member!.id}
                                                user={member!}
                                                onCardClick={() => {}}
                                                isAdmin={isMemberAdmin}
                                            />
                                        );
                                    })}
                            </div>
                            {groupMembers.length > 9 && (
                                <button
                                    type="button"
                                    className="text-start hover:bg-cardHoverColor text-2xl px-8 py-6 text-cyan-400"
                                >
                                    View all{' '}
                                    {` (${groupMembers.length - 9} more)`}
                                </button>
                            )}
                        </div>
                    )}

                    <div className="flex w-full px-8">
                        <button
                            type="button"
                            className="w-full text-start flex items-center text-rose-500 hover:bg-cardHoverColor py-4 px-3 gap-4"
                        >
                            <IoExitOutline className="text-5xl" />
                            <p className="text-2xl">Exit group</p>
                        </button>
                    </div>
                </DrawerChildrenWrapper>
            </Drawer>
        </>
    );
};

export default GroupInfoDrawer;
