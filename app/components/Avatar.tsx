'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarProps {
    user?: User;
}
export default function Avatar({ user }: AvatarProps) {
    return (
        <div className="relative w-16 h-16 bg-gray-300 rounded-full">
            <Image
                src={user?.image || '/user.png'}
                alt={'User Image'}
                width={40}
                height={40}
                priority
                className="bg-gray-300 rounded-full"
            />
            <div
                className="
                absolute 
                top-1 
                right-1
                ring-white
                ring-2
                h-2.5 
                w-2.5 
                bg-green-500 
                rounded-full"
            ></div>
        </div>
        // <div className="relative w-16 h-16 rounded-full overflow-hidden">
        //
        //
        //
        //
        //
        //
        //
        //
        //     <span className="block absolute rounded-full bg-green-500 ring-white top-0 right-0 h-2.5 w-2.5 z-20" />
        // </div>
    );
}
