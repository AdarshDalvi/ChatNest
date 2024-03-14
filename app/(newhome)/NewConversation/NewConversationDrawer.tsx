'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import { MdClear } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import { User } from '@prisma/client';
import { FieldValues, useForm } from 'react-hook-form';

import Drawer from '../components/Drawer/Drawer';
import NewConversationStepOne from './NewConversationStepOne';
import NewConversationStepTwo from './NewConversationStepTwo';
import NewConversationStepThree from './NewConversationStepThree';
import './NewConversationDrawer.scss';
import axios from 'axios';
import toast from 'react-hot-toast';
import getToastPosition from '@/app/lib/getToastPosition';
import DrawerChildrenWrapper from '../components/Drawer/DrawerChildrenWrapper';

export type DefaultGroupFormValues = FieldValues & {
    members: User[];
    name: string;
    image: string | null;
    groupDescription?: string;
};

export type StepIndex = 1 | 2 | 3;

type NewConversationDrawerProps = {
    showNewConversationDrawer: boolean;
    setShowNewConversationDrawer: Dispatch<SetStateAction<boolean>>;
    users: User[];
};

const NewConversationDrawer: React.FC<NewConversationDrawerProps> = ({
    users,
    showNewConversationDrawer,
    setShowNewConversationDrawer,
}) => {
    const [currentStepIndex, setCurrentStepIndex] = useState<StepIndex>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        reset,
        trigger,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<DefaultGroupFormValues>({
        defaultValues: {
            members: [],
            name: '',
            image: null,
            groupDescription: '',
        },
    });

    const closeNewConversationDrawer = () => {
        setShowNewConversationDrawer(false);
    };

    const toastPosition = getToastPosition();

    const isStepOne: boolean = currentStepIndex === 1;
    const isStepTwo: boolean = currentStepIndex === 2;
    const isStepThree: boolean = currentStepIndex === 3;

    const drawerIcon: IconType = isStepOne ? MdClear : IoArrowBack;
    const drawerHeading: string = isStepOne
        ? 'New Chat'
        : isStepTwo
        ? 'Add group members'
        : 'New group';

    const updateCurrentStepIndex = useCallback((stepIndex: StepIndex) => {
        setCurrentStepIndex(stepIndex);
    }, []);

    const startNewSingleConversation = async (user: User) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/single-chat', { user });
            closeNewConversationDrawer();
        } catch (error: any) {
            toast.error('Something went wrong!', {
                position: toastPosition,
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const closeDrawerFunction = isStepOne
        ? closeNewConversationDrawer
        : isStepTwo
        ? () => {
              updateCurrentStepIndex(1);
              reset();
          }
        : () => updateCurrentStepIndex(2);

    return (
        <Drawer
            icon={drawerIcon}
            closeDrawer={closeDrawerFunction}
            showDrawer={showNewConversationDrawer}
            iconRight={isStepOne}
            drawerHeading={drawerHeading}
            drawerOrigin="origin-left"
            disabled={loading}
        >
            <DrawerChildrenWrapper>
                {isStepOne && (
                    <NewConversationStepOne
                        disabled={loading}
                        users={users}
                        startNewSingleConversation={startNewSingleConversation}
                        updateCurrentStepIndex={updateCurrentStepIndex}
                    />
                )}
                {isStepTwo && (
                    <NewConversationStepTwo
                        users={users}
                        navigateTo={updateCurrentStepIndex}
                        getValues={getValues}
                        setValue={setValue}
                    />
                )}
                {isStepThree && (
                    <NewConversationStepThree
                        trigger={trigger}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        loading={loading}
                        setLoading={setLoading}
                        getValues={getValues}
                        setShowNewConversationDrawer={
                            setShowNewConversationDrawer
                        }
                    />
                )}
            </DrawerChildrenWrapper>
        </Drawer>
    );
};

export default NewConversationDrawer;
