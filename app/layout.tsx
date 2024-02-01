import type { Metadata } from 'next';
import './globals.scss';
import { Roboto } from 'next/font/google';
import ToastContext from './context/ToastContext';
import AuthContext from './context/AuthContext';
import clsx from 'clsx';
import { ConnversationContextProvider } from './context/ConversationContext';

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
            <body
                className={clsx(
                    `bg-cyan-950 flex justify-center w-screen h-screen`,
                    roboto.className
                )}
            >
                <AuthContext>
                    <ConnversationContextProvider>
                        <ToastContext />
                        {children}
                        <div id="modal"></div>
                    </ConnversationContextProvider>
                </AuthContext>
            </body>
        </html>
    );
}

export default RootLayout;
