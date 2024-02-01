import getUsers from '@/app/actions/getUsers';
import UserList from './components/UserList';
import Wrapper from '../components/WrapperComponents/Wrapper';
import EmptyState from '../components/EmptyState';
import ListWrapper from '../components/WrapperComponents/ListWrapper';

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
