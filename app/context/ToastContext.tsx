'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastContext() {
    return (
        <Toaster
            toastOptions={{
                style: {
                    fontSize: 'clamp( 10px , 0.6rem + 2vw,1.6rem)',
                    background: 'black',
                    color: 'white',
                },
            }}
        />
    );
}
