import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useData from '../hooks/useData';

function RequireNoAuth() {
    const { auth } = useAuth();
    const { nav } = useData();
    const location = useLocation();
    const user_id = auth?.user_id;
    const userAuth = user_id ? true : false;

    return !userAuth ? (
        <Outlet />
    ) : (
        <>
            <Navigate to={nav.home} state={{ from: location }} replace />
        </>
    );
}

export default RequireNoAuth;
