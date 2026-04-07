import SettingDialog from '@/components/elements/SettingDialog';
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
        <div className="grid grid-cols-12 w-full h-dvh overflow-hidden">
            <aside
                className={`
        fixed md:static bg-primary top-0 left-0 h-full overflow-hidden z-50
        col-span-12 md:col-span-3 lg:col-span-3
        flex flex-col
        w-[80%] md:w-auto
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}   
    `}
            >
                <div className="text-end px-3.5 py-0.5">
                    <Button
                        className="md:hidden"
                        onClick={() => setOpen(false)}
                    >
                        X
                    </Button>
                </div>

                <p className="retro text-center text-2xl text-green-700 font-extrabold tracking-tight mb-3 mt-0 ">
                    Teer
                </p>

                <Button className="mx-4 h-11 bg-primary text-primary-foreground hover:bg-primary/90">
                    Chats
                </Button>

                <div className="flex-1 min-h-0 no-scrollbar overflow-y-auto w-full px-5 my-4"> 
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-black font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                    <Card className="w-full flex-row items-center px-1.5 flex ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className=" font-bold text-[8px]">
                            Ahmad Siddique Shikrani Baloch shikrani balooch
                        </p>
                    </Card>
                </div>
                <div className="h-20 w-full ">
                    <SettingDialog />
                </div>
            </aside>

            {open && (
                <div
                    className="fixed inset-0  z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="col-span-12 border-l md:col-span-9 lg:col-span-9 flex flex-col h-dvh max-w-full">
                <header className="shrink-0 flex items-center px-4 py-3 gap-2 min-h-0 border-b">
                    <Button
                        className="md:hidden bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded"
                        onClick={() => setOpen(true)}
                    >
                        C
                    </Button>
                    <div className=" flex overflow-x-clip  justify-center items-center gap-1.5 ">
                        <Avatar>
                            <AvatarImage src="/image.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-secondary text-[8px] font-bold sm:font-normal  sm:text-sm retro truncate">
                            Ahmad Siddique Shikrani Baloch
                        </p>
                    </div>
                </header>

                <main className="flex-1 no-scrollbar overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-2 min-h-0">
                    <div className="self-start retro text-[8px] md:text-sm bg-secondary text-secondary-foreground px-3 py-2 rounded max-w-[85%] md:max-w-[70%] lg:max-w-[60%] wrap-break-word whitespace-pre-wrap">
                        Hello Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Facere sapiente unde eum eos voluptas repudiandae,
                        distinctio vero autem modi sunt ullam maxime delectus.,
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magni cupiditate, eligendi alias perspiciatis,
                        sint eveniet expedita, commodi vel incidunt quisquam
                        reprehe
                    </div>
                    <div className="self-end retro text-[8px] md:text-sm bg-primary text-primary-foreground px-3 py-2 rounded max-w-[85%] md:max-w-[70%] lg:max-w-[60%] wrap-break-word whitespace-pre-wrap">
                        Hi!
                    </div>
                    <div className="self-start retro text-[8px] md:text-sm bg-secondary text-secondary-foreground px-3 py-2 rounded max-w-[85%] md:max-w-[70%] lg:max-w-[60%] wrap-break-word whitespace-pre-wrap">
                        Hello Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Facere sapiente unde eum eos voluptas repudiandae,
                        distinctio vero autem modi sunt ullam maxime delectus.,
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magni cupiditate, eligendi alias perspiciatis,
                        sint eveniet expedita, commodi vel incidunt quisquam
                        reprehe
                    </div>
                    <div className="self-start retro text-[8px] md:text-sm bg-secondary text-secondary-foreground px-3 py-2 rounded max-w-[85%] md:max-w-[70%] lg:max-w-[60%] wrap-break-word whitespace-pre-wrap">
                        Hello Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Facere sapiente unde eum eos voluptas repudiandae,
                        distinctio vero autem modi sunt ullam maxime delectus.,
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magni cupiditate, eligendi alias perspiciatis,
                        sint eveniet expedita, commodi vel incidunt quisquam
                        reprehe
                    </div>
                    <div className="self-start retro text-[8px] md:text-sm bg-secondary text-secondary-foreground px-3 py-2 rounded max-w-[85%] md:max-w-[70%] lg:max-w-[60%] wrap-break-word whitespace-pre-wrap">
                        Hello Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Facere sapiente unde eum eos voluptas repudiandae,
                        distinctio vero autem modi sunt ullam maxime delectus.,
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magni cupiditate, eligendi alias perspiciatis,
                        sint eveniet expedita, commodi vel incidunt quisquam
                        reprehe
                    </div>
                </main>

                <footer className="shrink-0 border-t flex flex-row justify-center gap-4 items-center px-3 py-3 min-h-[60px]">
                    <Textarea
                        placeholder="Type a message..."
                        className="flex-1 text-[8px] sm:text-sm resize-none max-h-[30vh] no-scrollbar px-3 py-2 text-secondary rounded outline-none"
                    />
                    <Button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded shrink-0">
                        Send
                    </Button>
                </footer>
            </div>
        </div>
    );
};

export default Chat;
