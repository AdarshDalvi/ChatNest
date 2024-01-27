import getUsers from '@/app/actions/getUsers';
import UserList from './components/UserList';
import Wrapper from '../components/Wrapper';
import EmptyState from '../components/EmptyState';
import ListWrapper from '../components/ListWrapper';

export default async function People() {
    const users = await getUsers();
    return (
        <>
            <Wrapper>
                <ListWrapper>
                    <UserList users={users} />
                </ListWrapper>
            </Wrapper>
            <EmptyState />
        </>
    );
}
