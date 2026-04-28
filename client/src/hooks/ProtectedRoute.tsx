import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useApi from './apiClient';
import axios from 'axios';
import LoaderFallback from './LoaderFallback';
import useUser from '../store/User.store';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const { data, loading, execute } = useApi(() =>
        axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/verify`,
            {},
            {
                withCredentials: true,
            },
        ),
    );

    const { setUser } = useUser();

    useEffect(() => {
        execute();
    }, []);

    useEffect(() => {
        if (loading || !data) return;
        
       if (!data?.data.success) {
            navigate("/signin")
       }
       else {
            if (data?.data.user) {
                setUser(data.data.user);
            }
            navigate("/chat")
       }
    }, [data, loading]);

    if (loading) return <LoaderFallback />;
    return (
        <div>
            <Suspense fallback={<LoaderFallback />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default ProtectedRoute;
