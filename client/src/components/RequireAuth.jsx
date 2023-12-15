import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useData from '../hooks/useData';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PageNotFound from './PageNotFound';

function RequireAuth({ checkTAuthor }) {
    const { auth } = useAuth();
    const { nav, tourspots } = useData();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const { tourspotId } = useParams();

    const user_id = auth?.user_id;

    const userAuth = user_id ? true : false;
    const tourspotAuthor = checkTAuthor
        ? user_id === tourspots.find((item) => item._id === tourspotId).author
        : true;

    useEffect(() => {
        if (!userAuth) {
            enqueueSnackbar('Unauthorized', { variant: 'error' });
        }
    }, [userAuth]);

    // implement 404 page here
    return tourspotAuthor ? (
        <Outlet />
    ) : userAuth ? (
        <PageNotFound />
    ) : (
        <Navigate to={nav.login} state={{ from: location }} replace />
    );
}

export default RequireAuth;
