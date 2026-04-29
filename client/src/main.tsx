import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './app/retro-globals.css';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router/dom';
import Signin from './pages/Signin.tsx';
import './custom.css';
import Register from './pages/Register.tsx';
import Chat from './pages/Chat.tsx';
import { Toaster } from '@/components/ui/sonner';
import { ActiveThemeProvider } from '@/components/active-theme';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from './hooks/ProtectedRoute.tsx';
import PublicRoute from './hooks/PublicRoute.tsx';
import getCookie from './hooks/getCookie.ts';
import { Theme } from '@/lib/themes';

const cookieTheme = getCookie('active_theme');

const initialTheme = Object.values(Theme).includes(cookieTheme as Theme)
    ? (cookieTheme as Theme)
    : Theme.Arcade;

const RootLayout = () => (
    <ActiveThemeProvider initialTheme={initialTheme}>
        <Outlet />
    </ActiveThemeProvider>
);

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/register" replace />,
            },
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: '/register',
                        element: <Register />,
                    },
                    {
                        path: '/signin',
                        element: <Signin />,
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/chat',
                        element: <Chat />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="min-h-screen min-w-full">
            <RouterProvider router={router} />
            <Toaster />
        </div>
    </StrictMode>,
);

