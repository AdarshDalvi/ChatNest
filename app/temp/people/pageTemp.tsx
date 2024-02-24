import getUsers from '@/app/actions/getUsers';
import UserList from './components/UserList';
import EmptyState from '@/app/(home)/components/EmptyState';
import ListWrapper from '@/app/(home)/components/WrapperComponents/ListWrapper';
import PageWrapper from '@/app/(home)/components/WrapperComponents/PageWrapper';

export default async function People() {
    const users = await getUsers();
    return (
        <>
            <PageWrapper>
                <ListWrapper>
                    <UserList users={users} />
                </ListWrapper>
            </PageWrapper>
            <EmptyState />
        </>
    );
}
