const loading = () => {
    return (
        <main className="flex-1 flex flex-col h-dvh min-w-[250px] bg-secondary relative z-10">
            <div className="bg-chatBody bg-fixed h-full w-full opacity-5 absolute left-0 top-0 -z-10"></div>
            <header className="flex py-4 pl-4 pr-3 items-center gap-3 bg-primary z-10">
                <div className="loader h-2.5 w-14 "></div>
                <div className="loader rounded-full w-14 h-14 midPhones:w-16 midPhones:h-16"></div>

                <div className="flex-1 flex flex-col justify-center ml-2 gap-2">
                    <div className="loader h-5 w-56 "></div>
                    <div className="loader h-2.5 w-32 "></div>
                </div>
                <div className="loader h-10 mr-4 w-2"></div>
            </header>
            <div className="flex-1 w-full flex flex-col items-center justify-center gap-4">
                <div className="spinner border-[6px] border-solid border-gray-400 h-20 w-20 rounded-full border-t-primary"></div>
                <div className="text-xl midPhones:text-2xl ">
                    Loading chat...
                </div>
            </div>
            <div className="flex z-10 gap-1.5 midPhones:gap-2 pb-3 px-2">
                <div
                    className="loader h-[45px] flex-1  z-10 rounded-[2.2rem]"
                    style={{ backgroundColor: 'rgb(107 114 128)' }}
                ></div>
                <div
                    className="loader h-[45px] w-[45px] rounded-full"
                    style={{ backgroundColor: 'rgb(107 114 128)' }}
                ></div>
            </div>
        </main>
    );
};

export default loading;
