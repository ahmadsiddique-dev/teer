import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Signin from './pages/Signin.tsx';
import "./custom.css"
import Register from './pages/Register.tsx';

const router = createBrowserRouter([
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
  }
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className='bg-[#222a24] min-h-screen min-w-full'>
            <RouterProvider router={router} />
        </div>
    </StrictMode>,
);

