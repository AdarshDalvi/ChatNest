import getChats from '../actions/getChats';
import { getCurrentUser } from '../actions/getUser';
import getUsers from '../actions/getUsers';
import Header from './components/Header';

const page = async () => {
    const currentUser = await getCurrentUser();
    const users = await getUsers();
    const chats = await getChats();

    return (
        <>
            <main
                className="
                    relative
                    w-full
                    h-full
                    max-w-[1600px]
                    text-white
                    min-w-[250px]
                    "
            >
                <Header
                    currentUser={currentUser!}
                    users={users}
                    chats={chats}
                />
            </main>
        </>
    );
};

export default page;
