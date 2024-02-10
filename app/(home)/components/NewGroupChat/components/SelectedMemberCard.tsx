import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { MdClear } from 'react-icons/md';

type SelectedMemberCardProps = {
    selectedUser: User;
    deleteFromMember: (user: User) => void;
};

const SelectedMemberCard: React.FC<SelectedMemberCardProps> = ({
    selectedUser,
    deleteFromMember,
}) => {
    return (
        <div
            id="selected-member"
            className="flex flex-col   items-center gap-3"
        >
            <div className="relative  ">
                <Image
                    src={selectedUser.image || '/user.png'}
                    alt="selected-user"
                    height={40}
                    width={40}
                    className="w-16 h-16 rounded-full bg-gray-300"
                />
                <div
                    onClick={() => deleteFromMember(selectedUser)}
                    className="absolute bottom-1 -right-2 bg-gray-200 cursor-pointer rounded-full ring-2 ring-secondary p-1 transition-colors duration-150 hover:bg-red-500 "
                >
                    <MdClear className="text-xl text-secondary" />
                </div>
            </div>
            <p className="max-w-[60px] truncate">{selectedUser.name}</p>
        </div>
    );
};

export default SelectedMemberCard;
