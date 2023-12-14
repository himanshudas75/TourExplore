import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { useEffect } from 'react';

function Logout() {
    const { setAuth } = useAuth();
    useEffect(() => {
        setAuth({});
    });

    return <Navigate to="/" replace />;
}

export default Logout;
