'use client';

import { User } from '@prisma/client';
import SearchBox from '../../components/SearchBox';
import UserCard from './UserCard';
import { useSearchBox } from '@/app/hooks/useSearchBox';

interface UserListProps {
    users?: User[];
}

function UserList({ users }: UserListProps) {
    const { searchText, updateSearchText, clearSearchText } = useSearchBox();

    return (
        <>
            <SearchBox
                id="search-text"
                placeholder="Search by name, email, or phone"
                searchText={searchText}
                handleChange={updateSearchText}
                clearSearchText={clearSearchText}
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
