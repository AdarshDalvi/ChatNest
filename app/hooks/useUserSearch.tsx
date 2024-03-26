import { User } from '@prisma/client';
import { ChangeEvent, useEffect, useState } from 'react';

const useUserSearch = (userList?: User[]) => {
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilterdUsers] = useState<User[] | []>([]);

    useEffect(() => {
        if (userList) {
            const filterUsers = () => {
                setFilterdUsers((prevUsers) => {
                    if (searchText === '') {
                        return userList;
                    }

                    const newFilteredUsers: User[] = userList.filter((user) => {
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
        }
    }, [searchText, userList]);

    const updateSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText((prevValue) => event.target.value);
    };

    const clearSearchText = () => {
        setSearchText('');
    };

    return {
        searchText,
        updateSearchText,
        clearSearchText,
        filteredUsers,
    };
};

export default useUserSearch;
