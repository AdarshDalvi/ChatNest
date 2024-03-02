'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import { MdClear } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';

import Drawer from '../components/Drawer/Drawer';
import NewConversationStepOne from './NewConversationStepOne';
import NewConversationStepTwo from './NewConversationStepTwo';
import NewConversationStepThree from './NewConversationStepThree';
import './NewConversationDrawer.scss';
import axios from 'axios';
import useConversation from '@/app/hooks/useConversation';
import toast from 'react-hot-toast';
import getToastPosition from '@/app/lib/getToastPosition';

export type DefaultGroupFormValues = {
    members: User[];
    name: string;
    image: string | null;
};

export type NewConversationMode = 'SINGLE-CONVERSATION' | 'GROUP-CONVERSATION';
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
    const [conversationMode, setConversationMode] =
        useState<NewConversationMode>('SINGLE-CONVERSATION');

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
        },
    });

    const closeNewConversationDrawer = () => {
        setShowNewConversationDrawer(false);
    };
    const { updateConversationId } = useConversation();

    const isStepOne: boolean = currentStepIndex === 1;
    const isStepTwo: boolean = currentStepIndex === 2;
    const isStepThree: boolean = currentStepIndex === 3;

    const drawerIcon: IconType = isStepOne ? MdClear : IoArrowBack;
    const drawerHeading: string = isStepOne
        ? 'New Chat'
        : isStepTwo
        ? 'Add group members'
        : 'New group';

    const switchNewChatMode = (
        chatMode: NewConversationMode,
        stepIndex?: StepIndex
    ) => {
        setConversationMode((prevMode) => chatMode);
        if (stepIndex) {
            updateCurrentStepIndex(stepIndex);
        }
    };

    const updateCurrentStepIndex = useCallback((stepIndex: StepIndex) => {
        setCurrentStepIndex(stepIndex);
    }, []);

    const startNewSingleConversation = async (user: User) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/single-chat', { user });
            updateConversationId(data.id);
            closeNewConversationDrawer();
        } catch (error: any) {
            toast.error('Something went wrong!', {
                position: getToastPosition(),
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
            {isStepOne && (
                <NewConversationStepOne
                    disabled={loading}
                    users={users}
                    startNewSingleConversation={startNewSingleConversation}
                    switchNewConversationMode={switchNewChatMode}
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
            {isStepThree && <NewConversationStepThree />}
        </Drawer>
    );
};

export default NewConversationDrawer;
