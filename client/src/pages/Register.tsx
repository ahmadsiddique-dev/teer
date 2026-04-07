import { Button } from '@/components/ui/8bit/button';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@/components/ui/8bit/card';
import { Spinner } from '@/components/ui/8bit/spinner';
import { useDebounceCallback } from 'usehooks-ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/8bit/input';
import { Label } from '@/components/ui/8bit/label';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { Inputs } from './Signin';
import RegisterSchema from '@/schemas/registerSchema';
import { useEffect, useState } from 'react';
import useApi from '@/hooks/apiClient';
import axios from 'axios';
import { Link } from 'react-router';
import { toast } from '@/components/ui/8bit/toast';

const Register = () => {
    const [username, setUsername] = useState('');
    const debounced = useDebounceCallback(setUsername, 400);

    type RegisterInputs = Inputs & {
        paraphrase: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterInputs>({ resolver: zodResolver(RegisterSchema) });
    const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
        registerExecute(data);
    };

    const {
        data: registerData,
        error: registerError,
        execute: registerExecute,
        loading: registerLoading,
    } = useApi((payload) =>
        axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/register`, payload, {withCredentials: true}
        ),
    );

    console.log('registerError :>> ', registerError);
    console.log('RegsiterData: ', registerData);
    debounced(watch('username'));
    if (registerError) {
        toast(registerError);
    }
    const { data, loading, execute } = useApi(() =>
        axios.post<boolean>(
            `${import.meta.env.VITE_BACKEND_URL}/auth/check-unique`,
            { username },
        ),
    );

    useEffect(() => {
        execute();
    }, [username]);
    return (
        <main className="max-w-2xl max-h-screen overflow-y-hidden overflow-x-hidden dark retro py-12 mx-auto">
            <div>
                <h1 className="text-[#22c55e] text-center font-bold text-2xl tracking-tight">
                    <strong>TEER</strong>
                </h1>
                <h2 className="text-center bg-rose-500 mt-2.5">
                    The Anonymous Chat App
                </h2>
            </div>
            <div className="my-10">
                <Card>
                    <CardHeader className="text-center text-lg font-light">
                        Register Here!
                    </CardHeader>
                    <CardContent className=" mx-6 my-6">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex justify-between items-center">
                                <Label htmlFor="username">Username*</Label>
                                <span className=" flex justify-center items-center gap-2 text-[8px]">
                                    {username.length > 2 && (
                                        <>
                                            <span>
                                                {loading && (
                                                    <Spinner variant="diamond" />
                                                )}
                                            </span>{' '}
                                            <span
                                                className={
                                                    data?.data
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                }
                                            >
                                                {data?.data
                                                    ? 'Available'
                                                    : 'Occupied'}
                                            </span>
                                        </>
                                    )}
                                </span>
                            </div>
                            <Input
                                {...register('username')}
                                autoComplete="username"
                                type="text"
                                placeholder="Choose a unique username"
                                id="username"
                            />
                            <span className="text-[8px] text-red-500">
                                {errors.username?.message}
                            </span>
                            <Label htmlFor="password">Password*</Label>
                            <Input
                                {...register('password')}
                                autoComplete="new-password"
                                type="password"
                                placeholder="Don't make a crackable password"
                                id="password"
                            />
                            <span className="text-[8px] text-red-500">
                                {errors.password?.message}
                            </span>
                            <Label htmlFor="paraphrase">Paraphrase*</Label>
                            <Input
                                {...register('paraphrase')}
                                type="text"
                                placeholder="We just need it!"
                                id="paraphrase"
                            />
                            <span className="text-[8px] text-red-500">
                                {errors.paraphrase?.message}
                            </span>
                            <Button
                                disabled={registerLoading}
                                type="submit"
                                className="max-w-50 bg-rose-500 my-5"
                            >
                                {registerLoading && <Spinner />}Submit
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="text-center">
                        Less than 7days account? &ensp;
                        <Link
                            className="underline-offset-4 underline"
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};

export default Register;
