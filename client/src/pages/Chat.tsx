import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/8bit/avatar';
import { Button } from '@/components/ui/8bit/button';
import { Card } from '@/components/ui/8bit/card';
import { Textarea } from '@/components/ui/8bit/textarea';
import { useState } from 'react';

const Chat = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="grid grid-cols-12 w-full h-screen overflow-hidden">
            <aside
                className={`
        fixed md:static top-0 left-0 min-h-full z-50
        col-span-12 md:col-span-3 lg:col-span-3
        flex flex-col
        w-[75%] md:w-auto
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}
            >
                <div className="text-end px-3.5 py-3">
                    <Button
                        className="md:hidden"
                        onClick={() => setOpen(false)}
                    >
                        X
                    </Button>
                </div>

                <p className="retro text-center text-2xl font-extrabold tracking-tight mb-3 mt-0 text-green-500">
                    Teer
                </p>

                <Button className="mx-4 h-11 text-black bg-rose-500">
                    Chats
                </Button>

                <div className="flex-1 no-scrollbar overflow-y-auto w-full px-5 py-1 my-4">
                    <Card className="w-full flex-row px-1.5 flex bg-rose-900">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black">
                            Ahmad Siddique Shikrani Baloch
                        </p>
                    </Card>
                </div>
            </aside>

            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="col-span-12 border-l md:col-span-9 lg:col-span-9 grid grid-rows-12 h-screen">
                <header className="row-span-1 bg-rose-900 flex items-center px-4 gap-2 min-h-0">
                    <Button
                        className="md:hidden bg-white px-2 py-1 rounded"
                        onClick={() => setOpen(true)}
                    >
                        C
                    </Button>
                    <div className=" flex overflow-x-clip  justify-center items-center gap-1.5 ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black text-sm retro truncate">
                            Ahmad Siddique Shikrani Baloch
                        </p>
                    </div>
                </header>

                <main className="row-span-9 no-scrollbar overflow-y-auto p-4 flex flex-col gap-2 min-h-0">
                    <div className="self-start retro text-sm text-white bg-accent-foreground px-3 py-2 rounded max-w-xs wrap-break-word whitespace-pre-wrap">
                        Hello Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Facere sapiente unde eum eos voluptas repudiandae,
                        distinctio vero autem modi sunt ullam maxime delectus.,
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magni cupiditate, eligendi alias perspiciatis,
                        sint eveniet expedita, commodi vel incidunt quisquam
                        reprehe
                    </div>
                    <div className="self-end bg-white px-3 py-2 rounded max-w-xs wrap-break-word whitespace-pre-wrap">
                        Hi!
                    </div>
                    <div className="self-start retro text-sm text-white bg-accent-foreground px-3 py-2 rounded max-w-xs wrap-break-word whitespace-pre-wrap">
                        Hello Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Facere sapiente unde eum eos voluptas repudiandae,
                        distinctio vero autem modi sunt ullam maxime delectus.,
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magni cupiditate, eligendi alias perspiciatis,
                        sint eveniet expedita, commodi vel incidunt quisquam
                        reprehe
                    </div>
                </main>

                <footer className="row-span-2 border-t relative flex justify-center gap-4 items-center px-3 min-h-0">
                    <Textarea
                        placeholder="Type a message..."
                        className="flex-1 resize-none px-3 text-white py-2 rounded outline-none pr-30"
                    />
                    <Button className="px-4 py-2 absolute right-10 text-black bg-white rounded">
                        Send
                    </Button>
                </footer>
            </div>
        </div>
    );
};

export default Chat;
