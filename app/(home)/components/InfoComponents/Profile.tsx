'use client';

import { User } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
interface ProfileProps {
    currentUser: User;
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
    const [isHovering, setIsHovering] = useState(false);
    return (
        <>
            <div
                className="w-[30%] max-w-[200px] lg:max-w-[220px] relative rounded-full overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <Image
                    alt="Profile Picture"
                    src={currentUser.image || '/user.png'}
                    width={200}
                    height={200}
                    className="bg-gray-300  w-full"
                />

                <div
                    className={clsx(
                        `absolute cursor-pointer justify-center items-center inset-0 rounded-full bg-secondary z-10 bg-opacity-50 gap-1`,
                        isHovering ? 'flex flex-col' : 'hidden'
                    )}
                >
                    <BsCameraFill className="text-camIconSize" />
                    <p className="text-sm smallMobiles:text-base midPhones:text-xl uppercase text-center">
                        Change profile picture
                    </p>
                </div>
            </div>
            <div></div>
            <div></div>
        </>
    );
};

export default Profile;
