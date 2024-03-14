import NewGroupUserCard from '@/app/(newhome)/NewConversation/components/NewGroupUserCard';
import SearchBox from '@/app/(newhome)/components/SearchBox';
import { useSearchBox } from '@/app/hooks/useSearchBox';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { MdClear } from 'react-icons/md';

type NewMemberModalProps = {
    closeDialog: () => void;
    nonGroupMembers: User[];
};

const NewMemberModal: React.FC<NewMemberModalProps> = ({
    closeDialog,
    nonGroupMembers,
}) => {
    const { searchText, updateSearchText, clearSearchText } = useSearchBox();
    const [tempGroupMembers, setTempGroupMember] = useState<User[]>([]);

    const addDeleteTempGroupMember = (user: User) => {
        const selected = tempGroupMembers.findIndex(
            (member) => member.id === user.id
        );

        if (selected !== -1) {
            const updatedSelectedTempMembers = tempGroupMembers.filter(
                (member) => member.id !== user.id
            );
            setTempGroupMember((prevMembers) => updatedSelectedTempMembers);
        } else {
            const updatedSelectedTempMembers = [...tempGroupMembers, user];
            setTempGroupMember((prevMembers) => updatedSelectedTempMembers);
        }
    };
    return (
        <div className="flex flex-col bg-secondary rounded-md select-none">
            <div className="flex items-center gap-6 bg-primary py-6 px-6 rounded-t-md">
                <MdClear
                    className="text-2xl midPhones:text-4xl cursor-pointer"
                    onClick={closeDialog}
                />
                <p className="text-2xl midPhones:text-3xl">Add member</p>
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
                    {nonGroupMembers.map(
                        (nonMember, index, nonGroupMembers) => {
                            const selected = tempGroupMembers.findIndex(
                                (member) => member.id === nonMember.id
                            );
                            return (
                                <NewGroupUserCard
                                    key={nonMember.id}
                                    user={nonMember}
                                    lastElement={
                                        index === nonGroupMembers.length - 1
                                    }
                                    onClick={() =>
                                        addDeleteTempGroupMember(nonMember)
                                    }
                                    selected={selected !== -1}
                                />
                            );
                        }
                    )}
                </div>
                <button
                    className={clsx(
                        'absolute p-4 rounded-full bottom-24 right-20 text-4xl midPhones:text-5xl bg-primary scale-0 opacity-0 transition-all duration-200',
                        tempGroupMembers.length > 0 && 'scale-100 opacity-100'
                    )}
                >
                    <FaCheck />
                </button>
            </div>
        </div>
    );
};

export default NewMemberModal;
