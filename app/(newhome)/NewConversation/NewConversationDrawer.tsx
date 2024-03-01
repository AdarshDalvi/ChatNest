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

export type DefaultGroupFormValues = {
    members: User[];
    name: string;
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
        },
    });

    const closeNewConversationDrawer = () => {
        setShowNewConversationDrawer(false);
    };

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

    const startNewConversation = () => {
        // Logic for starting new conversation
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
        >
            {isStepOne && (
                <NewConversationStepOne
                    users={users}
                    startNewSingleConversation={startNewConversation}
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
