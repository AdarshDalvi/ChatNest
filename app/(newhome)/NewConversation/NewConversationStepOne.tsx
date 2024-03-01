'use client';

import { useSearchBox } from '@/app/hooks/useSearchBox';
import SearchBox from '../components/SearchBox';
import UserCard from '../components/UserCard';
import NewConversationStepsWrapper from './components/NewConversationStepsWrapper';
import { NewConversationMode, StepIndex } from './NewConversationDrawer';
import { User } from '@prisma/client';

type NewConversationStepOneProps = {
    switchNewConversationMode: (
        mode: NewConversationMode,
        stepIndex?: StepIndex
    ) => void;
    users: User[];
    startNewSingleConversation: (user: User) => void;
    disabled: boolean;
};

const NewConversationStepOne: React.FC<NewConversationStepOneProps> = ({
    switchNewConversationMode,
    users,
    startNewSingleConversation,
    disabled,
}) => {
    const { searchText, clearSearchText, updateSearchText } = useSearchBox();

    return (
        <NewConversationStepsWrapper>
            <div className="pl-2 w-full">
                <SearchBox
                    disabled={disabled}
                    placeholder="Search name, email or phone"
                    searchText={searchText}
                    handleChange={updateSearchText}
                    clearSearchText={clearSearchText}
                />
            </div>
            <div className="overflow-y-auto flex-1 w-full">
                <UserCard
                    disabled={disabled}
                    img="/group.png"
                    customInfo="New group"
                    onCardClick={() =>
                        switchNewConversationMode('GROUP-CONVERSATION', 2)
                    }
                    lastElement
                />
                <h3 className="text-2xl text-cyan-500 uppercase my-12 px-6 tracking-wide">
                    People on ChatNest
                </h3>
                {users.map((user, index) => {
                    return (
                        <UserCard
                            disabled={disabled}
                            key={user.id}
                            user={user}
                            onCardClick={() => startNewSingleConversation(user)}
                            lastElement={index === users.length - 1}
                        />
                    );
                })}
            </div>
        </NewConversationStepsWrapper>
    );
};

export default NewConversationStepOne;
