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
                cardFocusColor: '#324d5b',
                cardHoverColor: '#1E3947',
            },
            screens: {
                smallMobiles: '350px',
                midPhones: '500px',
            },
            height: {
                listHeight: 'calc(100dvh - 93.5px)',
                listHeightSmall: 'calc(100dvh - 88.5px)',
            },
            margin: {
                listMargin: '93.5px',
                listMarginSmall: '88.5px',
            },
            backgroundImage: {
                chatBody: 'url(/chat-bg.png)',
            },
            fontSize: {
                camIconSize: 'clamp(1.2rem,1rem + 1.3vw,3rem)',
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
