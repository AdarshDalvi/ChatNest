import Image from 'next/image';
import AuthForm from './components/AuthForm';

function Home() {
    return (
        <main className="flex flex-col h-screen items-center ">
            <div className="fixed z-[-1] top-0 left-0 right-0 h-56 bg-whatsappColor"></div>
            <div className="fixed z-[-1] top-56 left-0 right-0  bottom-0 bg-slate-100 dark:bg-zinc-900"></div>
            <div className="w-[90%] smallMobiles:w-[85%] midPhones:w-[75%] sm:w-[65%] md:[w-60%] max-w-[500px] flex flex-col items-center rounded mt-36 shadow-[0px_0px_20px_3px_#00000024]   bg-white py-8">
                <Image
                    src="/whatsappLogo.png"
                    height={46}
                    width={46}
                    alt="Logo"
                    className="drop-shadow-xl"
                    priority={true}
                />
                <h2 className="my-4 text-center">Sign in to your account</h2>
                <AuthForm />
            </div>
        </main>
    );
}

export default Home;
