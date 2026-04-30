import SettingDialog from '@/components/elements/SettingDialog';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/8bit/avatar';
import { Button } from '@/components/ui/8bit/button';
import { Card } from '@/components/ui/8bit/card';
import { Textarea } from '@/components/ui/8bit/textarea';
import React, { Activity, useEffect, useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/8bit/tabs';
import { Input } from '@/components/ui/8bit/input';
import useApi from '@/hooks/apiClient';
import axios from 'axios';
import { Spinner } from '@/components/ui/8bit/spinner';
import { useDebounceValue } from 'usehooks-ts';
import socket from '../socket.js';
import useUser from '@/store/User.store';
import type { IUser } from '@/types/user.types';
import type { IMessage } from '@/types/chat.types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/8bit/dialog';
import { toast } from '@/components/ui/8bit/toast';
import { Timer } from 'lucide-react';

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [sideNav, setSideNav] = useState(true);
    const [debouncedSearch, setSearch] = useDebounceValue<string>('', 500);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [activeRecipient, setActiveRecipient] = useState<{
        id: string;
        name: string;
        profileImage?: string;
    } | null>(null);
    const [remainingMs, setRemainingMs] = useState<number | null>(null);
    const [timerDialogOpen, setTimerDialogOpen] = useState(false);
    const [timerInput, setTimerInput] = useState({
        hours: '',
        minutes: '',
        seconds: '',
    });
    const [timerInputError, setTimerInputError] = useState<string | null>(null);
    const [timerSubmitting, setTimerSubmitting] = useState(false);
    const { data: user } = useUser((state) => state);

    useEffect(() => {
        if (!user?._id) return;

        const registerSocket = () => {
            socket.emit('register', user._id);
        };

        if (socket.connected) {
            registerSocket();
        }

        socket.on('connect', registerSocket);

        const handler = (data: IMessage) => {
            if (
                data.sender === user._id ||
                data.sender === activeRecipient?.id
            ) {
                setMessages((prev) => [...prev, data]);
            }
        };

        socket.on('message', handler);

        return () => {
            socket.off('connect', registerSocket);
            socket.off('message', handler);
        };
    }, [user?._id, activeRecipient?.id]);

    const sendMessage = () => {
        socket.emit('message', {
            message,
            userId: user?._id,
            receiverId: activeRecipient?.id || '',
        });

        setMessage('');
    };

    const {
        data: searchData,
        execute: searchExecute,
        loading: searchLoading,
    } = useApi(() =>
        axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/chat/search-user?user=${debouncedSearch}`,
        ),
    );

    useEffect(() => {
        searchExecute();
    }, [debouncedSearch]);

    const {
        data: chatData,
        loading: chatLoading,
        execute: chatExecute,
    } = useApi(() =>
        axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/chat/sidebar-chat?id=${user?._id}`,
        ),
    );

    const { data: chatMessageData, execute: chatMessagesExecute } = useApi(
        (id?: string) =>
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/get-chat`, {
                senderId: user?._id,
                receiverId: id,
            }),
    );

    useEffect(() => {
        if (chatMessageData?.data) {
            setMessages(chatMessageData.data);
        }
    }, [chatMessageData]);

    useEffect(() => {
        const list = chatData?.data;
        if (list && list.length > 0 && !activeRecipient) {
            const firstChat = list[0] as IUser;
            setActiveRecipient({
                id: firstChat._id,
                name: firstChat.username,
                profileImage: firstChat.profileImage,
            });
            chatMessagesExecute(firstChat._id);
        }
    }, [chatData, activeRecipient, chatMessagesExecute]);

    const handleChat = async () => {
        chatExecute();
        setSideNav(true);
    };

    useEffect(() => {
        chatExecute();
    }, []);

    const { data: remainingTimeData, execute: fetchRemainingTime } = useApi(
        () =>
            axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/auth/remaining-time?username=${user?.username}`,
            ),
    );

    useEffect(() => {
        if (!user?.username) return;
        fetchRemainingTime();
    }, [user?.username]);

    useEffect(() => {
        const ms = (remainingTimeData as any)?.data?.remainingTime;
        if (ms) setRemainingMs(ms);
    }, [remainingTimeData]);

    useEffect(() => {
        if (remainingMs === null) return;

        const interval = setInterval(() => {
            setRemainingMs((prev) => {
                if (prev === null || prev <= 1000) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingMs !== null]);

    const handleNewChat = async () => {
        setSideNav(false);
    };

    const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

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

                <p className="text-center my-2 font-bold text-secondary text-xl">
                    {remainingMs !== null
                        ? `${String(Math.floor(remainingMs / (1000 * 60 * 60))).padStart(2, '0')}:${String(Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')}:${String(Math.floor((remainingMs % (1000 * 60)) / 1000)).padStart(2, '0')}`
                        : '00:00:00'}
                </p>

                <Tabs defaultValue="account" className="w-100">
                    <TabsList className="grid w-ful md:max-w-2xs mx-auto my-1 grid-cols-2">
                        <TabsTrigger onClick={() => handleChat()} value="chat">
                            Chat
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => handleNewChat()}
                            value="new"
                        >
                            New Chat
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat"></TabsContent>
                    <TabsContent value="new">
                        <Input
                            defaultValue={''}
                            onChange={(e) => handleSearchUser(e)}
                            type="text"
                            placeholder="search..."
                            className="mx-6 border-l-transparent border-r-transparent"
                        />
                        {!searchLoading && !searchData?.data?.users?.filter((u: IUser) => u._id !== user?._id).length && (
                            <p className="retro text-secondary text-center mt-4 text-xs px-4">
                                {debouncedSearch
                                    ? 'No user found'
                                    : "All users might be deleted. If you're testing, you might need to create one to chat."}
                            </p>
                        )}
                    </TabsContent>
                </Tabs>

                <Activity mode={sideNav ? 'visible' : 'hidden'}>
                    <div className="flex-1 min-h-0 no-scrollbar overflow-y-auto w-full px-5 my-4">
                        {chatLoading ? (
                            <Spinner />
                        ) : chatData?.data.length === 0 ? (
                            <p className="retro text-center mt-3">No Chat</p>
                        ) : (
                            chatData?.data
                                .filter((chat: IUser) => chat._id !== user?._id)
                                .map((chat: IUser) => (
                                    <Card
                                        onClick={() => {
                                            setActiveRecipient({
                                                id: chat._id,
                                                name: chat.username,
                                                profileImage: chat.profileImage,
                                            });
                                            chatMessagesExecute(chat._id);
                                        }}
                                        key={chat._id}
                                        className="w-full flex-row mt-1 items-center px-1.5 flex cursor-pointer hover:bg-secondary/20"
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src={chat.profileImage}
                                            />
                                            <AvatarFallback>
                                                {chat.username
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-primary font-bold text-[8px] ml-2">
                                            {chat.username}
                                        </p>
                                    </Card>
                                ))
                        )}
                    </div>
                </Activity>

                <Activity mode={sideNav ? 'hidden' : 'visible'}>
                    <div className="flex-1 min-h-0 no-scrollbar overflow-y-auto w-full px-5 my-4">
                        {searchLoading ? (
                            'Loading...'
                        ) : !searchData?.data?.users?.filter((u: IUser) => u._id !== user?._id).length ? (
                            null
                        ) : (
                            searchData.data?.users
                                .filter((u: IUser) => u._id !== user?._id)
                                .map((u: IUser) => (
                                    <Card
                                        onClick={() => {
                                            setActiveRecipient({
                                                id: u._id,
                                                name: u.username,
                                                profileImage: u.profileImage,
                                            });
                                            chatMessagesExecute(u._id);
                                        }}
                                        key={u._id}
                                        className="w-full mt-1.5 flex-row items-center px-1.5 flex cursor-pointer hover:bg-secondary/20"
                                    >
                                        <Avatar>
                                            <AvatarImage src={u.profileImage} />
                                            <AvatarFallback>
                                                {u.username
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-primary font-bold text-[8px] ml-2">
                                            {u.username}
                                        </p>
                                    </Card>
                                ))
                        )}
                    </div>
                </Activity>
                <SettingDialog>
                    <Dialog
                        open={timerDialogOpen}
                        onOpenChange={(o) => {
                            setTimerDialogOpen(o);
                            setTimerInputError(null);
                            setTimerInput({
                                hours: '',
                                minutes: '',
                                seconds: '',
                            });
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="flex items-center gap-1 px-2 mr-1 py-1 text-[10px] h-auto shrink-0"
                            >
                                <Timer size={12} />
                                Edit
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Reduce Time</DialogTitle>
                            </DialogHeader>
                            <p className="text-xs text-muted-foreground retro">
                                Enter a time less than the remaining time. This
                                cannot be undone.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex flex-col items-center gap-1 flex-1">
                                    <label className="text-[10px] text-muted-foreground retro">
                                        HH
                                    </label>
                                    <Input
                                        type="number"
                                        min={0}
                                        placeholder="00"
                                        value={timerInput.hours}
                                        onChange={(e) => {
                                            setTimerInput((p) => ({
                                                ...p,
                                                hours: e.target.value,
                                            }));
                                            setTimerInputError(null);
                                        }}
                                        className="text-center"
                                    />
                                </div>
                                <span className="text-secondary font-bold text-lg mt-4">
                                    :
                                </span>
                                <div className="flex flex-col items-center gap-1 flex-1">
                                    <label className="text-[10px] text-muted-foreground retro">
                                        MM
                                    </label>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={59}
                                        placeholder="00"
                                        value={timerInput.minutes}
                                        onChange={(e) => {
                                            setTimerInput((p) => ({
                                                ...p,
                                                minutes: e.target.value,
                                            }));
                                            setTimerInputError(null);
                                        }}
                                        className="text-center"
                                    />
                                </div>
                                <span className="text-secondary font-bold text-lg mt-4">
                                    :
                                </span>
                                <div className="flex flex-col items-center gap-1 flex-1">
                                    <label className="text-[10px] text-muted-foreground retro">
                                        SS
                                    </label>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={59}
                                        placeholder="00"
                                        value={timerInput.seconds}
                                        onChange={(e) => {
                                            setTimerInput((p) => ({
                                                ...p,
                                                seconds: e.target.value,
                                            }));
                                            setTimerInputError(null);
                                        }}
                                        className="text-center"
                                    />
                                </div>
                            </div>
                            {timerInputError && (
                                <p className="text-red-500 text-[10px] retro mt-1">
                                    {timerInputError}
                                </p>
                            )}
                            <DialogFooter className="mt-4">
                                <Button
                                    disabled={timerSubmitting}
                                    onClick={async () => {
                                        const h = parseInt(
                                            timerInput.hours || '0',
                                            10,
                                        );
                                        const m = parseInt(
                                            timerInput.minutes || '0',
                                            10,
                                        );
                                        const s = parseInt(
                                            timerInput.seconds || '0',
                                            10,
                                        );

                                        if (isNaN(h) || isNaN(m) || isNaN(s)) {
                                            setTimerInputError(
                                                'Please enter valid numbers.',
                                            );
                                            return;
                                        }
                                        if (m > 59 || s > 59) {
                                            setTimerInputError(
                                                'Minutes and seconds must be between 0 and 59.',
                                            );
                                            return;
                                        }
                                        const editedMs =
                                            (h * 3600 + m * 60 + s) * 1000;
                                        if (editedMs <= 0) {
                                            setTimerInputError(
                                                'Time must be greater than zero.',
                                            );
                                            return;
                                        }
                                        if (
                                            remainingMs !== null &&
                                            editedMs >= remainingMs
                                        ) {
                                            setTimerInputError(
                                                'Time must be less than the remaining time.',
                                            );
                                            return;
                                        }
                                        setTimerSubmitting(true);
                                        try {
                                            await axios.patch(
                                                `${import.meta.env.VITE_BACKEND_URL}/auth/update-time`,
                                                {
                                                    username: user?.username,
                                                    editedTime: editedMs,
                                                },
                                            );
                                            setRemainingMs(editedMs);
                                            setTimerDialogOpen(false);
                                            toast('Time updated successfully.');
                                        } catch (err: any) {
                                            const msg =
                                                err?.response?.data?.message ||
                                                err?.response?.data?.error ||
                                                'Something went wrong.';
                                            toast(msg);
                                        } finally {
                                            setTimerSubmitting(false);
                                        }
                                    }}
                                >
                                    {timerSubmitting ? (
                                        <Spinner variant="diamond" />
                                    ) : (
                                        'Confirm'
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </SettingDialog>
            </aside>

            {open && (
                <div
                    className="fixed inset-0  z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="col-span-12 border-l border-accent-foreground md:col-span-9 lg:col-span-9 flex flex-col h-dvh max-w-full">
                <header className="shrink-0 flex items-center px-4 py-3 gap-2 min-h-0 border-b">
                    <Button
                        className="md:hidden bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded"
                        onClick={() => setOpen(true)}
                    >
                        C
                    </Button>
                    <div className=" flex overflow-x-clip  justify-center items-center gap-1.5 ">
                        <Avatar>
                            <AvatarImage src={activeRecipient?.profileImage} />
                            <AvatarFallback>
                                {activeRecipient?.name
                                    ? activeRecipient.name
                                          .charAt(0)
                                          .toUpperCase()
                                    : '?'}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-secondary text-[8px] font-bold sm:font-normal  sm:text-sm retro truncate">
                            {activeRecipient
                                ? activeRecipient.name
                                : 'Select a Chat'}
                        </p>
                    </div>
                </header>

                <main className="flex-1 no-scrollbar overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-2 min-h-0">
                    {messages.length === 0 ? (
                        <p className="retro text-center text-background opacity-35">
                            Start Chat
                        </p>
                    ) : (
                        messages.map((m: IMessage) => (
                            <div
                                key={m._id}
                                className={`${user?._id === m.sender ? 'self-end bg-primary text-primary-foreground' : 'self-start bg-secondary text-secondary-foreground'} retro text-[8px] md:text-sm px-3 py-2 rounded max-w-[85%] md:max-w-[70%] lg:max-w-[60%] wrap-break-word whitespace-pre-wrap`}
                            >
                                {m.content}
                            </div>
                        ))
                    )}
                </main>

                {activeRecipient && (
                    <footer className="shrink-0 border-t flex flex-row justify-center gap-4 items-center px-3 py-3 min-h-15">
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 text-[8px] sm:text-sm resize-none max-h-[30vh] no-scrollbar px-3 py-2 text-secondary rounded outline-none"
                        />
                        <Button
                            onClick={() => sendMessage()}
                            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded shrink-0"
                        >
                            Send
                        </Button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Chat;
