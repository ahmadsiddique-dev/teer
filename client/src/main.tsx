import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Signin from './pages/Signin.tsx';
import "./custom.css"

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
    element: ""
  }
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className='bg-[#c2410c] min-h-screen min-w-full'>
            <RouterProvider router={router} />
        </div>
    </StrictMode>,
);

