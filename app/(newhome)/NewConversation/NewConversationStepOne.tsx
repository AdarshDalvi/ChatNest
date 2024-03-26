'use client';

import useUserSearch from '@/app/hooks/useUserSearch';
import SearchBox from '../components/SearchBox';
import UserCard from '../components/UserCard';
import { StepIndex } from './NewConversationDrawer';
import { User } from '@prisma/client';
import NoResultsFound from '../components/NoResultsFound';

type NewConversationStepOneProps = {
    updateCurrentStepIndex: (stepIndex: StepIndex) => void;
    users: User[];
    startNewSingleConversation: (user: User) => void;
    disabled: boolean;
};

const NewConversationStepOne: React.FC<NewConversationStepOneProps> = ({
    updateCurrentStepIndex,
    users,
    startNewSingleConversation,
    disabled,
}) => {
    const { searchText, clearSearchText, updateSearchText, filteredUsers } =
        useUserSearch(users);

    return (
        <>
            <div className="pl-2 w-full">
                <SearchBox
                    disabled={disabled}
                    placeholder="Search name, email or phone"
                    searchText={searchText}
                    handleChange={updateSearchText}
                    clearSearchText={clearSearchText}
                />
            </div>
            <div className="overflow-y-auto flex-1 w-full flex flex-col">
                <UserCard
                    disabled={disabled}
                    img="/group.png"
                    customInfo="New group"
                    onCardClick={() => updateCurrentStepIndex(2)}
                    lastElement
                />
                <h3 className="text-2xl text-cyan-500 uppercase my-12 px-6 tracking-wide">
                    People on ChatNest
                </h3>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => {
                        return (
                            <UserCard
                                disabled={disabled}
                                key={user.id}
                                user={user}
                                onCardClick={() =>
                                    startNewSingleConversation(user)
                                }
                                lastElement={index === users.length - 1}
                            />
                        );
                    })
                ) : (
                    <div className="flex-1 flex justify-center items-center text-xl">
                        No users found
                    </div>
                )}
            </div>
        </>
    );
};

export default NewConversationStepOne;
