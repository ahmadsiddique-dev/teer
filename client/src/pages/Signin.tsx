import { Button } from '@/components/ui/8bit/button';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@/components/ui/8bit/card';
import { Input } from '@/components/ui/8bit/input';
import { Label } from '@/components/ui/8bit/label';

const Signin = () => {
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
                        SignIn now!
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 mx-6 my-6">
                        <Label htmlFor="username">Username*</Label>
                        <Input
                            type="text"
                            placeholder="Your username"
                            name="username"
                        />
                        <Label htmlFor="password">Password*</Label>
                        <Input
                            type="password"
                            placeholder="Enter your insecure password!"
                            name="password"
                        />
                        <Button type="submit" className="max-w-50 bg-rose-500 my-5">
                            Submit
                        </Button>
                    </CardContent>
                    <CardFooter className="text-center">
                        Make an account? &ensp;
                        <a
                            className="underline-offset-4 underline"
                            href="/register"
                        >
                            Signin
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};

export default Signin;
