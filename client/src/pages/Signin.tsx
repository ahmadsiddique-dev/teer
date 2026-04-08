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

export type Inputs = {
    username: string;
    password: string;
};

const Signin = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) =>  SigninExecute(data);

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

    useEffect(() => {
        if (SigninData) {
            navigate('/chat');
        }
    }, [SigninData]);

    console.log("SigininError: ", SigninError)
    return (
        <main className="max-w-2xl overflow-x-hidden  dark retro py-12 mx-auto">
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
                                {SiginLoading && <Spinner variant='diamond' />}Submit
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="text-center">
                        Make an account? &ensp;
                        <Link
                            className="underline-offset-4 underline"
                            to="/register"
                        >
                             Signin
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};

export default Signin;
