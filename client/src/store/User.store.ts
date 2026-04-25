import { create } from 'zustand';

type User = {
    username: string;
    user_id: string;
    receiver_id: string;
};

interface UserState {
    loading: boolean;
    error: null | string;
    data: User | null;

    setUser: (user: Partial<User>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

const useUser = create<UserState>((set) => ({
    data: null,
    loading: false,
    error: null,

    setUser: (user: Partial<User>) =>
        set((state) => ({
            data: state.data ? { ...state.data, ...user } : (user as User),
        })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));

export default useUser;
