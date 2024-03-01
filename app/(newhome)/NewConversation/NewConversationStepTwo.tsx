import { useSearchBox } from '@/app/hooks/useSearchBox';
import SearchBox from '../components/SearchBox';
import NewConversationStepsWrapper from './components/NewConversationStepsWrapper';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import NewGroupUserCard from './components/NewGroupUserCard';
import NewGroupSelectedMemberCard from './components/NewGroupSelectedMemberCard';
import { IoArrowForward } from 'react-icons/io5';
import { DefaultGroupFormValues, StepIndex } from './NewConversationDrawer';
import {
    UseFormGetValues,
    UseFormReset,
    UseFormSetValue,
    useForm,
} from 'react-hook-form';

type NewConversationStepTwoProps = {
    users: User[];
    navigateTo: (stepIndex: StepIndex) => void;
    getValues: UseFormGetValues<DefaultGroupFormValues>;
    setValue: UseFormSetValue<DefaultGroupFormValues>;
};

const NewConversationStepTwo: React.FC<NewConversationStepTwoProps> = ({
    users,
    navigateTo,
    getValues,
    setValue,
}) => {
    const members = getValues('members');

    const { searchText, clearSearchText, updateSearchText } = useSearchBox();
    const [selectedMembers, setSelectedMembers] = useState<User[] | []>(
        members
    );
    const [filteredUsers, setFilterdUsers] = useState<User[] | []>([]);

    useEffect(() => {
        const filterUsers = () => {
            setFilterdUsers((prevUsers) => {
                if (searchText === '') {
                    return users;
                }
                const newFilteredUsers: User[] = users.filter((user) => {
                    const sameName = user.name
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase());
                    const sameEmail = user.email
                        ?.toLowerCase()
                        .includes(searchText.toLowerCase());
                    const sameNumber = user.phone
                        ?.toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase());

                    return sameName || sameEmail || sameNumber;
                });
                return newFilteredUsers;
            });
        };
        filterUsers();
    }, [searchText, users]);

    const addDeleteGroupMember = (user: User) => {
        const selected = selectedMembers.findIndex(
            (member) => member.id === user.id
        );

        if (selected !== -1) {
            const updatedSelectedMembers = selectedMembers.filter(
                (member) => member.id !== user.id
            );
            setSelectedMembers((prevMembers) => updatedSelectedMembers);
        } else {
            const updatedSelectedMembers = [...selectedMembers, user];
            setSelectedMembers((prevMembers) => updatedSelectedMembers);
        }
    };

    const saveAndNavigateToNextPage = () => {
        setValue('members', selectedMembers);
        navigateTo(3);
    };

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
            {selectedMembers.length > 0 && (
                <div
                    id="selected-members-container"
                    className="self-start mt-2 w-[98%] px-6 grid justify-start max-h-56 overflow-y-auto gap-x-6 gap-y-4"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, 60px)',
                    }}
                >
                    {selectedMembers.map((selectedMember) => (
                        <NewGroupSelectedMemberCard
                            key={selectedMember.id}
                            selectedUser={selectedMember}
                            deleteFromMember={addDeleteGroupMember}
                        />
                    ))}
                </div>
            )}
            <div
                className="flex-1 w-full min-h-0 overflow-y-auto"
                style={{ scrollbarGutter: 'stable' }}
            >
                {filteredUsers.map((user, index, users) => {
                    const selected = selectedMembers.findIndex(
                        (member) => member.id === user.id
                    );
                    return (
                        <NewGroupUserCard
                            key={user.id}
                            user={user}
                            onClick={() => addDeleteGroupMember(user)}
                            lastElement={index === users.length - 1}
                            selected={selected !== -1}
                        />
                    );
                })}
            </div>
            {selectedMembers.length > 0 && (
                <button
                    type="button"
                    onClick={saveAndNavigateToNextPage}
                    id="navigate-step-two"
                    className="absolute bottom-32  p-4 bg-primary rounded-full"
                >
                    <IoArrowForward className="text-[2.5rem]" />
                </button>
            )}
        </NewConversationStepsWrapper>
    );
};

export default NewConversationStepTwo;
