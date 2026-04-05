import React from 'react';

const Chat = () => {
    return (
        <div className='grid-cols-12 grid w-full h-screen'>
            <aside className='col-span-4 md:col-span-3 bg-amber-200'>
                <div className='text-end px-3.5 py-3'>
                    X
                </div>
            </aside>
            <div className='md:col-span-9 col-span-8 grid grid-rows-12 bg-rose-400'>
                <header className='row-span-1 bg-green-600'></header>
                <main className='row-span-9'></main>
                <footer className='row-span-2 bg-green-600'></footer>
            </div>
        </div>
    );
};

export default Chat;
