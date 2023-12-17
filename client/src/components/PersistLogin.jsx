import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';
import useLocalStorage from '../hooks/useLocalStorage';

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken && persist
            ? verifyRefreshToken()
            : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    if (!persist) {
        return <Outlet />;
    } else {
        return <>{isLoading ? <Loading /> : <Outlet />}</>;
    }
}

export default PersistLogin;
