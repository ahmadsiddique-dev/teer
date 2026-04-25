import { Button } from '@/components/ui/8bit/button';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@/components/ui/8bit/card';
import { Input } from '@/components/ui/8bit/input';
import { Label } from '@/components/ui/8bit/label';
import { Link } from 'react-router';
import useApi from '@/hooks/apiClient';
import axios from 'axios';
import { Spinner } from '@/components/ui/8bit/spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeConfig } from '@/components/active-theme';
import { Theme } from '@/lib/themes';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/8bit/select';
import useUser from '@/store/User.store';

export type Inputs = {
    username: string;
    password: string;
};

const Signin = () => {
    const { activeTheme, setActiveTheme } = useThemeConfig();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => SigninExecute(data);

    const {
        data: SigninData,
        loading: SiginLoading,
        error: SigninError,
        execute: SigninExecute,
    } = useApi((data) =>
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data, {
            withCredentials: true,
        }),
    );

    const { setUser } = useUser((state) => state);

    useEffect(() => {
        if (SigninData) {
            setUser(SigninData.data);
            localStorage.setItem('_id', SigninData.data?._id);
            navigate('/chat');
        }
    }, [SigninData]);

    console.log('SigininError: ', SigninError);
    return (
        <main className="max-w-2xl relative overflow-x-hidden retro py-12 mx-auto">
            <div className="absolute right-10 top-10">
                <Select
                    value={activeTheme}
                    onValueChange={(val) => setActiveTheme(val as Theme)}
                >
                    <SelectTrigger className="w-45 bg-primary text-primary-foreground border-2 border-primary-foreground">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(Theme).map((themeValue) => (
                            <SelectItem key={themeValue} value={themeValue}>
                                {themeValue.charAt(0).toUpperCase() +
                                    themeValue.slice(1).replace('-', ' ')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <h1 className="text-primary text-center font-bold text-2xl tracking-tight">
                    <strong>TEER</strong>
                </h1>
                <h2 className="text-center bg-secondary text-secondary-foreground px-2 py-1 mt-2.5">
                    The Anonymous Chat App
                </h2>
            </div>
            <div className="my-10">
                <Card>
                    <CardHeader className="text-center text-lg font-light">
                        SignIn now!
                    </CardHeader>
                    <CardContent className=" mx-6 my-6">
                        <form
                            className="flex flex-col gap-3"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Label htmlFor="username">Username*</Label>
                            <Input
                                {...register('username', {
                                    required: {
                                        value: true,
                                        message: 'Username is required',
                                    },
                                    minLength: {
                                        value: 2,
                                        message: 'Too short username',
                                    },
                                    maxLength: {
                                        value: 200,
                                        message:
                                            'Username must be less than 200 characters',
                                    },
                                })}
                                autoComplete="username"
                                type="text"
                                placeholder="Your username"
                                id="username"
                            />
                            <span className="text-[8px] text-destructive">
                                {errors.username?.message}
                            </span>
                            <Label htmlFor="password">Password*</Label>
                            <Input
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required field',
                                    },
                                    minLength: {
                                        value: 4,
                                        message: 'Too short password',
                                    },
                                    maxLength: {
                                        value: 200,
                                        message:
                                            'Password must be less than 200 characters',
                                    },
                                })}
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter your insecure password!"
                                id="password"
                            />
                            <span className="text-[8px] text-destructive">
                                {errors.password?.message}
                            </span>
                            <Button
                                disabled={SiginLoading}
                                type="submit"
                                className="max-w-50 bg-primary text-primary-foreground hover:bg-primary/90 my-5"
                            >
                                {SiginLoading && <Spinner variant="diamond" />}
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="text-center">
                        Make an account? &ensp;
                        <Link
                            className="underline-offset-4 underline"
                            to="/register"
                        >
                            Register
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};

export default Signin;
