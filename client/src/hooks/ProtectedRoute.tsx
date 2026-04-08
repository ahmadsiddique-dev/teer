import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import useApi from './apiClient';
import axios from 'axios';
import LoaderFallback from './LoaderFallback';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const { data, loading, execute } = useApi(() =>
        axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/`,
            {},
            {
                withCredentials: true,
            },
        ),
    );

    useEffect(() => {
        if (!loading && data) {
            if (!data?.data.success) {
                navigate('/signin');
            }
        }
    }, [data, loading]);

    if (loading) return <LoaderFallback />
    useEffect(() => {
        execute();
    }, []);
    return (
        <div>
            <Suspense fallback={<LoaderFallback />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default ProtectedRoute;
