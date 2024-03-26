import type { Metadata } from 'next';
import './globals.scss';
import { Roboto } from 'next/font/google';
import ToastContext from './context/ToastContext';
import AuthContext from './context/AuthContext';
import clsx from 'clsx';
import { ConnversationContextProvider } from './context/ConversationContext';
import ReactQueryProvider from './ReactQueryProvider';

export const metadata: Metadata = {
    title: 'ChatNest',
    description: 'ChatNest Messenger App',
};

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: 'normal',
    subsets: ['latin'],
});

async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="favicon/apple-icon-57x57.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="60x60"
                    href="favicon/apple-icon-60x60.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="favicon/apple-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="favicon/apple-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="favicon/apple-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="favicon/apple-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="favicon/apple-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="favicon/apple-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="favicon/apple-icon-180x180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="favicon/android-icon-192x192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="favicon/favicon-96x96.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="favicon/favicon-16x16.png"
                />
                <link rel="manifest" href="favicon/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta
                    name="msapplication-TileImage"
                    content="/ms-icon-144x144.png"
                />
                <meta name="theme-color" content="#ffffff" />
            </head>
            <body
                className={clsx(
                    `bg-cyan-950 flex justify-center w-screen min-h-dvh`,
                    roboto.className
                )}
            >
                <AuthContext>
                    <ReactQueryProvider>
                        <ConnversationContextProvider>
                            <ToastContext />
                            {children}
                        </ConnversationContextProvider>
                    </ReactQueryProvider>
                </AuthContext>
            </body>
        </html>
    );
}

export default RootLayout;
