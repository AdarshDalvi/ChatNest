'use client';

import { User } from '@prisma/client';
import SearchBox from '../../components/SearchBox';
import { FieldValues, useForm } from 'react-hook-form';
import UserCard from './UserCard';

interface UserListProps {
    users?: User[];
}

function UserList({ users }: UserListProps) {
    const { register, resetField, watch } = useForm<FieldValues>({
        defaultValues: {
            searchText: '',
        },
    });
    return (
        <>
            <SearchBox
                id="search-text"
                register={register}
                resetField={resetField}
                watchForm={watch}
                placeholder="Search by name, email, or phone"
            />
            <div
                className="flex-1 overflow-y-auto  pr-2 "
                style={{ scrollbarGutter: 'stable' }}
            >
                {users?.map((user, index, users) => {
                    return (
                        <UserCard
                            key={user.name}
                            user={user}
                            lastElement={index === users.length - 1}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default UserList;
