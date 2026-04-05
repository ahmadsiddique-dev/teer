import { Button } from '@/components/ui/8bit/button';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@/components/ui/8bit/card';
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/8bit/input';
import { Label } from '@/components/ui/8bit/label';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { Inputs } from './Signin';
import RegisterSchema from '@/schemas/registerSchema';


const Register = () => {
    type RegisterInputs = Inputs & {
        paraphrase: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInputs>({resolver: zodResolver(RegisterSchema)});
    const onSubmit: SubmitHandler<RegisterInputs> = (data) => console.log(data);
 
    return (
        <main className="max-w-2xl dark retro py-12 mx-auto">
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
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <Label htmlFor="username">Username*</Label>
                            <Input
                                {...register('username')}
                                autoComplete='username'
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
                                autoComplete='new-password'
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
                                type="submit"
                                className="max-w-50 bg-rose-500 my-5"
                            >
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="text-center">
                        Less than 7days account? &ensp;
                        <a
                            className="underline-offset-4 underline"
                            href="/signin"
                        >
                            Signin
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};

export default Register;
