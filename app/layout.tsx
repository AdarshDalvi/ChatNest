import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import ToastContext from './context/ToastContext';
import AuthContext from './context/AuthContext';

export const metadata: Metadata = {
    title: 'ChatNest',
    description: 'ChatNest Messenger App',
    icons: {
        icon: {
            url: '/images/favicon.ico',
            href: '/images/favicon.ico',
        },
    },
};

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: 'normal',
    subsets: ['latin'],
});

async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={roboto.className} suppressHydrationWarning>
                <AuthContext>
                    <ToastContext />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}

export default RootLayout;
