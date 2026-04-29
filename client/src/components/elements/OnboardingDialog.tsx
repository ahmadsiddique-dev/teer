import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/8bit/button';
import {
    GameController,
    Hourglass,
    ChatTeardrop,
    Skull,
    Flag,
} from '@phosphor-icons/react';

const SLIDES = [
    {
        icon: <GameController size={40} weight="fill" />,
        title: 'Welcome to TEER',
        body: 'TEER is an anonymous chat application. Every account you create comes with a countdown timer — when it hits zero, your account and all your messages vanish forever.',
    },
    {
        icon: <Hourglass size={40} weight="fill" />,
        title: 'Your Clock is Ticking',
        body: 'From the moment you register, a countdown begins. You can see your remaining time in the sidebar. You can reduce it further — but you can never add more time back.',
    },
    {
        icon: <ChatTeardrop size={40} weight="fill" />,
        title: 'Chat Anonymously',
        body: 'There are many different themes that you can enjoy and can select one you like. btw my personal favourite is Zelda',
    },
    {
        icon: <Skull size={40} weight="fill" />,
        title: 'Your Data, Gone Forever',
        body: "When your timer runs out, everything is deleted automatically — your profile, conversations, and messages. No trace left behind. That's the whole point.",
    },
    {
        icon: <Flag size={40} weight="fill" />,
        title: "You're Ready",
        body: "Create an account, start chatting, and enjoy your limited time. Make it count.",
    },
];

const STORAGE_KEY = 'teer_onboarding_done';

const OnboardingDialog = () => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            setVisible(true);
        }
    }, []);

    const handleNext = () => {
        if (step < SLIDES.length - 1) {
            setStep((s) => s + 1);
        } else {
            handleDone();
        }
    };

    const handleDone = () => {
        setExiting(true);
        setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, '1');
            setVisible(false);
        }, 400);
    };

    if (!visible) return null;

    const slide = SLIDES[step];

    return (
        <div
            className={`fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-400 ${exiting ? 'opacity-0' : 'opacity-100'}`}
        >
            <div
                className="relative bg-card border-4 border-foreground mx-4 max-w-md w-full p-8 flex flex-col items-center gap-6"
                style={{ boxShadow: '6px 6px 0 var(--foreground)' }}
            >
                <div className="absolute -top-1.5 w-1/2 left-1.5 h-1.5 bg-foreground" />
                <div className="absolute -top-1.5 w-1/2 right-1.5 h-1.5 bg-foreground" />
                <div className="absolute -bottom-1.5 w-1/2 left-1.5 h-1.5 bg-foreground" />
                <div className="absolute -bottom-1.5 w-1/2 right-1.5 h-1.5 bg-foreground" />

                <div className="flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground border-2 border-foreground"
                    style={{ boxShadow: '3px 3px 0 var(--foreground)' }}
                >
                    {slide.icon}
                </div>

                <h2 className="retro text-center text-primary text-xl font-bold">{slide.title}</h2>

                <p className="retro text-center text-sm text-foreground/80 leading-relaxed">{slide.body}</p>

                <div className="flex gap-1.5 mt-2">
                    {SLIDES.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-none transition-all duration-300 ${i === step ? 'w-6 bg-primary' : 'w-2 bg-foreground/30'}`}
                        />
                    ))}
                </div>

                <div className="flex items-center justify-between w-full mt-2 gap-3">
                    <button
                        onClick={handleDone}
                        className="retro text-xs text-foreground/50 hover:text-foreground/80 transition-colors cursor-pointer"
                    >
                        Skip
                    </button>
                    <Button onClick={handleNext} className="retro px-6">
                        {step < SLIDES.length - 1 ? 'Next →' : 'Get Started'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingDialog;
