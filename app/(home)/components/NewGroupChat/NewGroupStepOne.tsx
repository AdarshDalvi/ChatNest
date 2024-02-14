'use client';

import { User } from '@prisma/client';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useEffect, useState } from 'react';
import NewGroupUserCard from './components/NewGroupUserCard';
import { useSearchBox } from '@/app/hooks/useSearchBox';
import SearchBox from '../SearchBox';
import SelectedMemberCard from './components/SelectedMemberCard';
import { IoArrowForward } from 'react-icons/io5';

interface NewGroupStepOneProps {
    id: string;
    users: User[];
    setValue: UseFormSetValue<FieldValues>;
    navigateToNextStep: (page: 0 | 1) => void;
}
const NewGroupStepOne: React.FC<NewGroupStepOneProps> = ({
    id,
    users,
    setValue,
    navigateToNextStep,
}) => {
    const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

    const [filteredUsers, setFilterdUsers] = useState<User[]>(users);
    const { searchText, updateSearchText, clearSearchText } = useSearchBox();

    const addDeleteGroupMember = (user: User) => {
        if (selectedMembers.includes(user)) {
            const updatedSelectedMembers = selectedMembers.filter(
                (member) => member.id !== user.id
            );
            setSelectedMembers((prevMembers) => updatedSelectedMembers);
        } else {
            const updatedSelectedMembers = [...selectedMembers, user];
            setSelectedMembers((prevMembers) => updatedSelectedMembers);
        }
    };

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
    }, [searchText]);

    const saveAndNavigateToNextPage = () => {
        setValue('members', selectedMembers);
        navigateToNextStep(1);
    };

    return (
        <>
            <h2 className="text-2xl midPhones:text-[1.6rem] px-4 self-start">
                Add group members{' '}
                {selectedMembers.length > 0 && (
                    <span>{`(${selectedMembers.length})`}</span>
                )}
            </h2>
            <SearchBox
                id={id}
                placeholder="Search name, number or email"
                searchText={searchText}
                handleChange={updateSearchText}
                clearSearchText={clearSearchText}
            />

            {selectedMembers.length > 0 && (
                <div
                    id="selected-members-container"
                    className="self-start mt-2 w-[98%] px-6 grid justify-start max-h-56 overflow-y-auto gap-x-6 gap-y-4"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, 60px)',
                    }}
                >
                    {selectedMembers.map((selectedMember) => (
                        <SelectedMemberCard
                            key={selectedMember.id}
                            selectedUser={selectedMember}
                            deleteFromMember={addDeleteGroupMember}
                        />
                    ))}
                </div>
            )}
            <div
                className="min-h-0 flex-1 w-full flex flex-col overflow-y-auto pr-2"
                style={{ scrollbarGutter: 'stable' }}
            >
                {filteredUsers.map((user, index, users) => (
                    <NewGroupUserCard
                        key={user.id}
                        user={user}
                        onClick={() => addDeleteGroupMember(user)}
                        lastElement={index === users.length - 1}
                        selected={selectedMembers.includes(user)}
                    />
                ))}
            </div>
            {selectedMembers.length > 0 && (
                <button
                    type="button"
                    onClick={saveAndNavigateToNextPage}
                    id="navigate-step-two"
                    className="absolute bottom-32  p-5 bg-primary rounded-full"
                >
                    <IoArrowForward className="text-[2.5rem]" />
                </button>
            )}
        </>
    );
};

export default NewGroupStepOne;
