import {
    Dialog,
    DialogContent,
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
import { Input } from '../ui/8bit/input';
import { Label } from '../ui/8bit/label';
import { useThemeConfig } from '@/components/active-theme';
import { Theme } from '@/lib/themes';
import useApi from '@/hooks/apiClient';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Spinner } from '../ui/8bit/spinner';
import React, { useEffect } from 'react';
import useUser from '@/store/User.store';
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

    const { data: user, setUser } = useUser();
    
    // We use a local state for preview before it's uploaded successfully
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);

    const [, setProfileFile] = React.useState<File | null>(null);
    const [uploading, setUploading] = React.useState(false);
    const [uploaded, setUploaded] = React.useState(false);

    const uploadProfileImage = async (file: File) => {
        setUploading(true);
        setUploaded(false);
        try {
            const formData = new FormData();
            formData.append('profileImage', file);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/upload-profile`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data.success) {
                setUploaded(true);
                toast('Profile image uploaded successfully.');
                setUser({ profileImage: response.data.profileImage });
            } else {
                toast(response.data.message || 'Upload failed.');
            }
        } catch (err: any) {
            toast(err?.response?.data?.message || 'Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileFile(file);
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPreviewImage(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
            uploadProfileImage(file);
        }
    };

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
                        </DialogHeader>
                        <div className="flex flex-col gap-2 items-start w-full">
                            <Label htmlFor="profile-image">Profile Image</Label>
                            {!uploaded && (
                                <Input
                                    id="profile-image"
                                    accept="image/*"
                                    type="file"
                                    onChange={handleProfileImageChange}
                                    className="w-full"
                                    disabled={uploading}
                                />
                            )}
                            {uploading && (
                                <div className="flex justify-center w-full mt-2">
                                    <Spinner variant="diamond" />
                                    <span className="ml-2">Uploading...</span>
                                </div>
                            )}
                            {uploaded && !uploading && (
                                <div className="flex justify-center w-full mt-2 text-green-600 font-bold">
                                    ok
                                </div>
                            )}
                            {(previewImage || user?.profileImage) && !uploading && (
                                <div className="flex flex-col items-center w-full mt-2">
                                    <img
                                        src={previewImage || user?.profileImage}
                                        alt="Profile Preview"
                                        className="w-20 h-20 rounded-full object-cover border"
                                    />
                                    {uploaded && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => {
                                                setUploaded(false);
                                                setPreviewImage(null);
                                                setProfileFile(null);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
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
                    {user?.username || 'Guest'}
                </p>
            </Card>
        </div>
    );
};

export default SettingDialog;
