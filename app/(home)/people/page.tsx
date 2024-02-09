import getUsers from '@/app/actions/getUsers';
import UserList from './components/UserList';
import PageWrapper from '../components/WrapperComponents/PageWrapper';
import EmptyState from '../components/EmptyState';
import ListWrapper from '../components/WrapperComponents/ListWrapper';

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
