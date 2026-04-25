import { create } from 'zustand';
import type { IUser } from '../types/user.types';

interface UserState {
    loading: boolean;
    error: null | string;
    data: IUser | null;

    setUser: (user: Partial<IUser>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
}

const idFromLocal = localStorage.getItem('_id');

const useUser = create<UserState>((set) => ({
    data: idFromLocal ? { _id: idFromLocal, username: '' } : null,
    loading: false,
    error: null,

    setUser: (user: Partial<IUser>) =>
        set((state) => ({
            data: state.data ? { ...state.data, ...user } : (user as IUser),
        })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    logout: () => {
        localStorage.removeItem('_id');
        set({ data: null });
    },
}));

export default useUser;
