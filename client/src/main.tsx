import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "./app/retro-globals.css";
import App from './App.tsx';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Signin from './pages/Signin.tsx';
import "./custom.css"
import Register from './pages/Register.tsx';
import Chat from './pages/Chat.tsx';
import { Toaster } from "@/components/ui/sonner"
import { ActiveThemeProvider } from "@/components/active-theme"
import { Outlet } from "react-router-dom";

const RootLayout = () => (
  <ActiveThemeProvider initialTheme='arcade'>
    <Outlet />
  </ActiveThemeProvider>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/chat",
        element: <Chat />
      }
    ]
  }
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className='min-h-screen min-w-full'>
            <RouterProvider router={router} />
            <Toaster />
        </div>
    </StrictMode>,
);

