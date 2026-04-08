import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useApi from './apiClient';
import axios from 'axios';
import LoaderFallback from './LoaderFallback';

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

    useEffect(() => {
        // if (!loading && !data) {
        //     navigate('/signin');
        // }
        if (!loading && data) {
            if (data?.data.success) {
                navigate('/chat');
            }
        }
    }, [data, loading]);

    useEffect(() => {
        execute();
    }, []);

    if (loading) return <LoaderFallback />
    return (
        <div>
            <Suspense fallback={<LoaderFallback />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default ProtectedRoute;
