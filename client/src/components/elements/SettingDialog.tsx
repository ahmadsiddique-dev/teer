import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/8bit/dialog';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/8bit/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/8bit/select';
import { Card } from '../ui/8bit/card';
import { Button } from '../ui/8bit/button';
import { useThemeConfig } from '@/components/active-theme';
import { Theme } from '@/lib/themes';
import useApi from '@/hooks/apiClient';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Spinner } from '../ui/8bit/spinner';
import { useEffect } from 'react';
import { toast } from '../ui/8bit/toast';

const SettingDialog = () => {
    const navigate = useNavigate();
    const { activeTheme, setActiveTheme } = useThemeConfig();

    const {
        loading: logoutLoading,
        data: logoutData,
        error: logoutError,
        execute: logoutExecute,
    } = useApi(() =>
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, '', {
            withCredentials: true,
        }),
    );

    useEffect(() => {
        if (logoutData?.data.success) {
            console.log('Data: ', logoutData);
            toast(logoutData.data.message || 'Logged out successfully.');
        }

        if (logoutError) {
            toast(logoutError || 'Some thing went wrong.');
        }
    }, [logoutData, logoutError]);
    return (
        <div>
            <Card className="w-full flex-row items-center px-1.5 flex">
                <Dialog>
                    <DialogTrigger>
                        <img
                            className=" setting active:rotate-90 duration-200"
                            src="/setting.png"
                            alt="setting-icon"
                        />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Profile</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex flex-row justify-between items-center w-full gap-4 mt-4">
                            <Select
                                value={activeTheme}
                                onValueChange={(val) =>
                                    setActiveTheme(val as Theme)
                                }
                            >
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(Theme).map((themeValue) => (
                                        <SelectItem
                                            key={themeValue}
                                            value={themeValue}
                                        >
                                            {themeValue
                                                .charAt(0)
                                                .toUpperCase() +
                                                themeValue
                                                    .slice(1)
                                                    .replace('-', ' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="shrink-0">Logout</Button>
                                </PopoverTrigger>
                                <PopoverContent side="top">
                                    <p className="retro">
                                        Do you really want to logout
                                    </p>
                                    <div className="flex justify-center items-center gap-9 my-4">
                                        <Button
                                            onClick={() => {
                                                logoutExecute();
                                                navigate('/signin');
                                            }}
                                            disabled={logoutLoading}
                                            variant={'outline'}
                                        >
                                            {logoutLoading && (
                                                <Spinner variant="diamond" />
                                            )}{' '}
                                            Confirm
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <p className="font-bold text-[8px] ml-2">
                    Ahmad Siddique Shikrani Baloch shikrani balooch
                </p>
            </Card>
        </div>
    );
};

export default SettingDialog;
