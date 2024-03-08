'use client';

import Drawer from '@/app/(newhome)/components/Drawer/Drawer';
import DrawerChildrenWrapper from '@/app/(newhome)/components/Drawer/DrawerChildrenWrapper';
import EditableNoImage from '@/app/(newhome)/components/ImageComponents/EditableNoImage';
import InfoImage from '@/app/(newhome)/components/ImageComponents/InfoImage';
import { Conversation, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { MdClear, MdSearch } from 'react-icons/md';
import ViewOnlyImage from './components/ViewOnlyImage';
import SaveCancelButtons from '../../components/SaveCancelButtons';
import EditInfoInput from '@/app/components/inputs/EditInfoInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import GroupMemberCard from './components/GroupMemberCard';

import { IoExitOutline, IoPersonAdd } from 'react-icons/io5';
import axios from 'axios';

interface GroupInfoDrawerProps {
    conversation: Conversation & {
        users: User[];
    };
    showGroupInfoDrawer: boolean;
    setShowGroupInfoDrawer: Dispatch<SetStateAction<boolean>>;
}

const GroupInfoDrawer: React.FC<GroupInfoDrawerProps> = ({
    conversation,
    showGroupInfoDrawer,
    setShowGroupInfoDrawer,
}) => {
    const session = useSession();
    const [loading, setLoading] = useState(false);
    const [conversationImage, setConversationImage] = useState<string | null>(
        conversation.image
    );
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
            members: conversation.users,
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

    function areArraysEqual(arr1: User[], arr2: User[]) {
        // Check if the arrays have the same length
        if (arr1.length !== arr2.length) {
            return false;
        }

        // Convert arr2 to a Set for faster lookup
        const set2 = new Set(arr2.map((user) => user.id));

        // Check if all IDs from arr1 exist in arr2
        for (const user of arr1) {
            if (!set2.has(user.id)) {
                return false;
            }
        }

        // If all IDs from arr1 exist in arr2, return true
        return true;
    }

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

    const updateGroupInfo = async (key: 'name' | 'users' | 'image') => {
        const fieldValue = getValues(key);
        const isFieldChanged = fieldValue !== conversation[key];
        const data = getValues();

        if (isFieldChanged || key === 'users') {
            const success = await updateGroup(data);
            if (success) {
                // Handle success if needed
            }
        }
    };

    return (
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
                <EditInfoInput
                    disabled={!isCurrentUserAdmin ? true : false}
                    saveButton={isCurrentUserAdmin ? true : undefined}
                    id="name"
                    errors={errors}
                    placeHolder="Group name"
                    register={register}
                    saveFunction={() => updateGroupInfo('name')}
                    validationSchema={{
                        required: 'Group name cannot be empty!',
                    }}
                    trigger={trigger}
                    maxLength={30}
                    fullWidth={false}
                    customWidth={{
                        editOnWidth: 'w-[70%]',
                        editOffWidth: '',
                    }}
                />
                {isCurrentUserAdmin && (
                    <div className="px-8 w-full mt-16">
                        <button
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
                                {conversation.users.length} members
                            </p>
                            <button type="button" className="text-3xl">
                                <MdSearch />
                            </button>
                        </div>
                        <div className="flex flex-col  min-w-0 mt-8">
                            {groupMembers.slice(0, 10).map((member, index) => {
                                const isMemberAdmin =
                                    conversation.adminsIds.findIndex(
                                        (adminId) => adminId === member!.id
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
                                View all {` (${groupMembers.length - 9} more)`}
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
    );
};

export default GroupInfoDrawer;
