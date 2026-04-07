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

const SettingDialog = () => {
    const { activeTheme, setActiveTheme } = useThemeConfig();

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
                                onValueChange={(val) => setActiveTheme(val as Theme)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(Theme).map((themeValue) => (
                                        <SelectItem key={themeValue} value={themeValue}>
                                            {themeValue.charAt(0).toUpperCase() + themeValue.slice(1).replace('-', ' ')}
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
                                    <div className='flex justify-center items-center gap-9 my-4'>
                                        <Button>Yes</Button>
                                        <Button variant={'secondary'}>
                                            No
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
