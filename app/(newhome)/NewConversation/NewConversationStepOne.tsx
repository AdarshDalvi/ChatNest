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
    startNewSingleConversation: () => void;
};

const NewConversationStepOne: React.FC<NewConversationStepOneProps> = ({
    switchNewConversationMode,
    users,
    startNewSingleConversation,
}) => {
    const { searchText, clearSearchText, updateSearchText } = useSearchBox();

    return (
        <NewConversationStepsWrapper>
            <div className="pl-2 w-full">
                <SearchBox
                    placeholder="Search name, email or phone"
                    searchText={searchText}
                    handleChange={updateSearchText}
                    clearSearchText={clearSearchText}
                />
            </div>
            <div className="overflow-y-auto flex-1 w-full">
                <UserCard
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
                            key={user.id}
                            user={user}
                            onCardClick={startNewSingleConversation}
                            lastElement={index === users.length - 1}
                        />
                    );
                })}
            </div>
        </NewConversationStepsWrapper>
    );
};

export default NewConversationStepOne;
