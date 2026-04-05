import { useState } from 'react';

const Chat = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="grid grid-cols-12 w-full h-screen overflow-hidden">

            <aside
                className={`
                    fixed md:static top-0 left-0 h-full z-50
                    col-span-12 md:col-span-3 lg:col-span-3
                    bg-amber-200 flex flex-col
                    w-[75%] md:w-auto
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                <div className="text-end px-3.5 py-3 border-b">
                    <button onClick={() => setOpen(false)}>X</button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    <div className="p-2 bg-white rounded">Chat 1</div>
                    <div className="p-2 bg-white rounded">Chat 2</div>
                    <div className="p-2 bg-white rounded">Chat 3</div>
                </div>
            </aside>

            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="col-span-12 md:col-span-9 lg:col-span-9 grid grid-rows-12 bg-rose-400">

                <header className="row-span-1 bg-green-600 flex items-center px-4 gap-2">

                    <button
                        className="md:hidden bg-white px-2 py-1 rounded"
                        onClick={() => setOpen(true)}
                    >
                        ☰
                    </button>

                    Chat Header
                </header>

                <main className="row-span-9 overflow-y-auto p-4 flex flex-col gap-2">
                    <div className="self-start bg-white px-3 py-2 rounded max-w-xs">
                        Hello 👋
                    </div>
                    <div className="self-end bg-white px-3 py-2 rounded max-w-xs">
                        Hi!
                    </div>
                </main>

                <footer className="row-span-2 bg-green-600 flex items-center px-3 gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 rounded outline-none"
                    />
                    <button className="px-4 py-2 bg-white rounded">Send</button>
                </footer>

            </div>
        </div>
    );
};

export default Chat;
