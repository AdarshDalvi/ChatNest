'use client';

import { User } from '@prisma/client';
import clsx from 'clsx';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useEffect, useState } from 'react';
import NewGroupUserCard from './NewGroupUserCard';
import { useSearchBox } from '@/app/hooks/useSearchBox';
import SearchBox from '../../SearchBox';

interface NewGroupStepOneProps {
    id: string;
    users: User[];
    setValue: UseFormSetValue<FieldValues>;
}
const NewGroupStepOne: React.FC<NewGroupStepOneProps> = ({
    id,
    users,
    setValue,
}) => {
    const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

    const [filteredUsers, setFilterdUsers] = useState<User[]>(users);
    const { searchText, updateSearchText, clearSearchText } = useSearchBox();

    const addnNewGroupMember = () => {};

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

    return (
        <div className="flex flex-col w-full  overflow-y-hidden">
            <SearchBox
                id={id}
                placeholder="Search name, number or email"
                searchText={searchText}
                handleChange={updateSearchText}
                clearSearchText={clearSearchText}
            />
            <div></div>
            <div className="min-h-0 flex-1 flex flex-col overflow-y-auto px-4">
                {filteredUsers.map((user) => (
                    <NewGroupUserCard
                        key={user.id}
                        user={user}
                        onClick={addnNewGroupMember}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewGroupStepOne;
