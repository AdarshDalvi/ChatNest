import React from 'react';
import PageWrapper from '../components/WrapperComponents/PageWrapper';
import ListWrapper from '../components/WrapperComponents/ListWrapper';
import UserList from './components/UserList';
import { User } from '@prisma/client';
import EmptyState from '../components/EmptyState';

type UsersProps = {
    users: User[];
};

const Users: React.FC<UsersProps> = ({ users }) => {
    return (
        <main className="flex w-full h-full">
            <PageWrapper>
                <ListWrapper>
                    <UserList users={users} />
                </ListWrapper>
            </PageWrapper>
            <EmptyState />
        </main>
    );
};

export default Users;
