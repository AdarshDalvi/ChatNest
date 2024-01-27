import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F4C75',
                secondary: '#1B262C',
                borderColor: '#2c6b94',
                cardBorder: '#2c4049',
                searchBoxBg: '#2d3f48',
                placeHolderColor: '#8696A0',
            },
            screens: {
                smallMobiles: '350px',
                midPhones: '500px',
            },
            height: {
                listHeight: 'calc(100vh - 93.5px)',
            },
            backgroundImage: {
                chatBody: 'url(/chat-bg.png)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};
export default config;
