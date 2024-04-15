import NoResultsFound from '@/app/(newhome)/components/NoResultsFound';
import SearchBox from '@/app/(newhome)/components/SearchBox';
import UserCard from '@/app/(newhome)/components/UserCard';
import useUserSearch from '@/app/hooks/useUserSearch';
import { User } from '@prisma/client';
import { MdClear } from 'react-icons/md';

type AllMembersModalProps = {
    members: User[];
    closeDialog: () => void;
};

const AllMembersModal: React.FC<AllMembersModalProps> = ({
    members,
    closeDialog,
}) => {
    const { searchText, updateSearchText, clearSearchText, filteredUsers } =
        useUserSearch(members);
    return (
        <div className="flex flex-col bg-secondary rounded-md select-none">
            <div className="flex items-center gap-6 bg-primary py-6 px-6 rounded-t-md">
                <MdClear
                    className="text-2xl midPhones:text-4xl cursor-pointer"
                    onClick={() => {
                        closeDialog();
                        // setTempGroupMember((prevData) => []);
                    }}
                />
                <p className="text-2xl midPhones:text-3xl">Search members</p>
            </div>
            <div className="h-[80dvh] w-[95dvw] max-w-[400px] flex flex-col py-4 gap-4 relative">
                <SearchBox
                    searchText={searchText}
                    clearSearchText={clearSearchText}
                    handleChange={updateSearchText}
                    placeholder="Search name, email or number"
                />
                <div
                    className="flex-1 overflow-y-auto pr-2"
                    style={{ scrollbarGutter: 'stable' }}
                >
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((member, index, members) => {
                            return (
                                <UserCard
                                    key={member.id}
                                    user={member}
                                    lastElement={index === members.length - 1}
                                    onCardClick={() => {}}
                                />
                            );
                        })
                    ) : (
                        <NoResultsFound noResultText="No members found" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllMembersModal;
