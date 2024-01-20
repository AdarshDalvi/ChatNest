import UserCard from './UserCard';
import getUsers from '@/app/actions/getUsers';

async function UserList() {
    const users = await getUsers();
    return (
        <div className="flex flex-col w-full h-full  overflow-y-auto">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}

export default UserList;
