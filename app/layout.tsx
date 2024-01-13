import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import ToastContext from './context/ToastContext';
import AuthContext from './context/AuthContext';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
    title: 'WhatsApp Clone',
    description: 'WhatsApp Clone created using Next + React',
};

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: 'normal',
    subsets: ['latin'],
});

async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body suppressHydrationWarning={true} className={roboto.className}>
                <AuthContext session={session}>
                    <ToastContext />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}

export default RootLayout;
