'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiAlertTriangle } from 'react-icons/fi';

export default function Error() {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? 'Email already in use with a different provider!'
            : 'Oops Something Went Wrong!';

    return (
        <div className="w-full flex flex-col min-h-full items-center justify-center text-center bg-gradient-to-b from-cyan-500 to-blue-500">
            <div className="bg-white mx-4 text-black flex flex-col gap-8 p-12 rounded-2xl items-center">
                <Image
                    src="/logochat.png"
                    height={48}
                    width={48}
                    alt="Logo"
                    className="drop-shadow-xl"
                    priority={true}
                />
                <h3 className="text-2xl md:text-3xl  text-gray-500">
                    {urlError}
                </h3>
                <FiAlertTriangle className="text-4xl text-red-500" />
                <Link
                    href={'/login'}
                    className="text-xl md:text-2xl mt-2 transition-colors duration-200 text-slate-950 hover:text-gray-400"
                >
                    Back to login
                </Link>
            </div>
        </div>
    );
}
