'use client';

import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdClear, MdSearch } from 'react-icons/md';
import { IoExitOutline, IoPersonAdd } from 'react-icons/io5';

import Drawer from '@/app/(newhome)/components/Drawer/Drawer';
import DrawerChildrenWrapper from '@/app/(newhome)/components/Drawer/DrawerChildrenWrapper';
import ModalWrapper from '../../../components/WrapperComponents/ModalWrapper';
import useModalDialog from '@/app/hooks/useModalDialog';
import capitalizeString from '@/app/lib/capitaliseString';

import {
    AllMembersModal,
    GroupIconSection,
    GroupInfoSection,
    GroupMemberCard,
    NewMemberModal,
} from './components';

import { Conversation, User } from '@prisma/client';
import { Option } from '@/app/(newhome)/components/OptionsMenu';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/app/(newhome)/components/DialogComponents/ConfirmationDialog';

export type Action = 'connect' | 'disconnect';

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

    const router = useRouter();

    const [modalDialogRef, openDialog, closeDialog] = useModalDialog();

    const [allMembersDialog, openAllMembersDialog, closeAllMembersDialog] =
        useModalDialog();

    const [confirmGroupAdminLeave, openGroupAdminLeave, closeGroupAdminLeave] =
        useModalDialog();
    const [confirmGroupLeave, openGroupLeave, closeGroupLeave] =
        useModalDialog();

    const {
        register,
        formState: { errors },
        getValues,
        trigger,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            groupName: conversation.groupName,
            groupIcon: conversation.groupIcon,
            groupDescription: conversation.groupDescription,
        },
    });

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

    const isCurrentUserGroupOwner = useMemo(() => {
        if (!currentUser || !currentUser.id) {
            return false;
        }
        return currentUser.id === conversation.groupCreatedById;
    }, [currentUser]);

    const groupMembers = useMemo(() => {
        if (!currentUser || !currentUser.id || !currentUser.name) {
            return [];
        }
        const currentUserGroupMember = conversation.members.find(
            (user) => user.id === currentUser.id
        );
        if (!currentUserGroupMember || !currentUserGroupMember.id) {
            return [];
        }
        currentUserGroupMember.name = 'You';
        const groupMembersWithoutCurrentUser = conversation.members.filter(
            (user) => user.id !== currentUser.id
        );

        const updatedGroupMembers = [
            currentUserGroupMember,
            ...groupMembersWithoutCurrentUser,
        ];
        return updatedGroupMembers;
    }, [currentUser, conversation.members]);

    const closeGroupInfoDrawer = () => {
        reset();
        setShowGroupInfoDrawer(false);
    };

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

    const updateGroupMembers = async (groupMembers: User[], action: Action) => {
        const member = groupMembers.length > 1 ? 'members' : 'member';
        const loadingToast = toast.loading(
            action == 'connect'
                ? `Adding new ${member}...`
                : `Removing ${capitalizeString(
                      groupMembers[0].name!
                  )} from group...`,
            {
                position: 'bottom-center',
            }
        );
        setLoading(true);
        try {
            const reponse = await axios.patch(
                `/api/group-chat/${conversation.id}/members`,
                {
                    members: groupMembers,
                    action: action,
                }
            );
            toast.dismiss(loadingToast);
            toast.success(
                action === 'connect'
                    ? `New ${member} added successfully!`
                    : `${capitalizeString(
                          groupMembers[0].name!
                      )} removed from group!`,
                {
                    position: 'bottom-center',
                }
            );
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong! Please try again later.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateAdmins = async (member: User, action: Action) => {
        setLoading(true);
        const loadingToast = toast.loading(
            action === 'connect'
                ? `Making ${capitalizeString(member.name!)} a group admin...`
                : `Removing ${capitalizeString(
                      member.name!
                  )} as a group admin...`,
            { position: 'bottom-center' }
        );
        try {
            const response = await axios.patch(
                `/api/group-chat/${conversation.id}/admins`,
                {
                    memberId: member.id,
                    action,
                }
            );
            toast.dismiss(loadingToast);
            toast.success(
                action === 'connect'
                    ? `${capitalizeString(member.name!)} is now a group admin`
                    : `Dismissed ${member.name} as a group admin`,
                {
                    position: 'bottom-center',
                    duration: 3000,
                    className: 'text-center',
                }
            );
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong! Please try again later.', {
                position: 'bottom-center',
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const exitFromGroup = () => {
        if (
            isCurrentUserGroupOwner &&
            isCurrentUserAdmin &&
            conversation.adminsIds.length < 2
        ) {
            openGroupAdminLeave();
        } else {
            openGroupLeave();
        }
    };

    const exitGroup = async () => {
        try {
            const response = await axios.delete(
                `/api/group-chat/${conversation.id}`,
                {
                    data: {
                        isMemberAdmin: isCurrentUserAdmin,
                        memberLength: conversation.members.length,
                    },
                }
            );
            router.replace('/');
            router.refresh();
        } catch (error: any) {
            toast.error('Something went wrong! Please try again later.');
            console.log('', error);
        }
    };

    return (
        <>
            <ModalWrapper ref={confirmGroupAdminLeave}>
                <ConfirmationDialog
                    closeModal={closeGroupAdminLeave}
                    modalMessage="Please assign atleast one admin before leaving the group."
                    confirmText="Okay"
                    isLoading={loading}
                    modalHeading="Assign group admin"
                    confirmAction={() => {
                        closeGroupAdminLeave();
                    }}
                    accent
                    infoModal
                />
            </ModalWrapper>
            <ModalWrapper ref={confirmGroupLeave}>
                <ConfirmationDialog
                    closeModal={closeGroupLeave}
                    modalMessage="Are you sure you want to leave the group?"
                    confirmText="Leave"
                    isLoading={loading}
                    modalHeading="Confirm group exit"
                    confirmAction={() => {
                        exitGroup();
                        closeGroupLeave();
                    }}
                />
            </ModalWrapper>
            <ModalWrapper ref={modalDialogRef}>
                <NewMemberModal
                    closeDialog={closeDialog}
                    nonGroupMembers={users.filter(
                        (user) =>
                            !groupMembers.some(
                                (groupMember) => groupMember?.id === user.id
                            )
                    )}
                    updateGroupMembers={updateGroupMembers}
                />
            </ModalWrapper>
            <ModalWrapper ref={allMembersDialog} clickOutsideToClose>
                <AllMembersModal
                    members={groupMembers}
                    closeDialog={closeAllMembersDialog}
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
                    <GroupIconSection
                        isCurrentUserAdmin={isCurrentUserAdmin}
                        initialGroupIcon={conversation.groupIcon}
                    />
                    <GroupInfoSection
                        isCurrentUserAdmin={isCurrentUserAdmin}
                        conversation={conversation}
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        getValues={getValues}
                        updateGroup={updateGroup}
                    />
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
                        <div className="flex flex-col w-full px-8 mt-8">
                            <div className="flex justify-between">
                                <p className="text-xl midPhones:text-2xl">
                                    {conversation.members.length} members
                                </p>
                                <button
                                    type="button"
                                    className="text-3xl"
                                    onClick={openAllMembersDialog}
                                >
                                    <MdSearch />
                                </button>
                            </div>
                            <div className="flex flex-col  min-w-0 mt-8">
                                {groupMembers.slice(0, 10).map((member) => {
                                    const isMemberAdmin =
                                        conversation.adminsIds.findIndex(
                                            (adminId) => adminId === member!.id
                                        ) !== -1;

                                    const removeOption: Option = {
                                        name: 'Remove',
                                        onClick: () =>
                                            updateGroupMembers(
                                                [member],
                                                'disconnect'
                                            ),
                                    };

                                    const dismissAdmin: Option = {
                                        name: 'Dismiss as admin',
                                        onClick: () =>
                                            updateAdmins(member, 'disconnect'),
                                    };

                                    const makeAdmin: Option = {
                                        name: 'Make group admin',
                                        onClick: () =>
                                            updateAdmins(member, 'connect'),
                                    };

                                    const optionList: Option[] = [];
                                    if (!isMemberAdmin && isCurrentUserAdmin) {
                                        optionList.push(
                                            makeAdmin,
                                            removeOption
                                        );
                                    }
                                    if (
                                        isMemberAdmin &&
                                        isCurrentUserGroupOwner
                                    ) {
                                        optionList.push(
                                            removeOption,
                                            dismissAdmin
                                        );
                                    }

                                    return (
                                        <GroupMemberCard
                                            key={member.id}
                                            user={member}
                                            isMemberAdmin={isMemberAdmin}
                                            isCurrentUser={
                                                currentUser?.id === member.id
                                            }
                                            isCurrentUserAdmin={
                                                isCurrentUserAdmin
                                            }
                                            optionList={optionList}
                                            isMemberGroupOwner={
                                                member.id ===
                                                conversation.groupCreatedById
                                            }
                                            isCurrentUserGroupOwner={
                                                isCurrentUserGroupOwner
                                            }
                                        />
                                    );
                                })}
                            </div>
                            {groupMembers.length > 9 && (
                                <button
                                    type="button"
                                    className="text-start hover:bg-cardHoverColor text-2xl px-8 py-6 text-cyan-400"
                                    onClick={openAllMembersDialog}
                                >
                                    View all
                                    {` (${groupMembers.length - 9} more)`}
                                </button>
                            )}
                        </div>
                    )}

                    <div className="flex w-full px-8 mt-8 mb-4">
                        <button
                            onClick={exitFromGroup}
                            type="button"
                            className="w-full text-start flex items-center text-red-500 hover:bg-cardHoverColor py-4 px-3 gap-4"
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
