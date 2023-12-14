import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useData from '../hooks/useData';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function RequireAuth({ checkTAuthor }) {
    const { auth } = useAuth();
    const { tourspots } = useData();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const { tourspotId } = useParams();
    const user_id = auth?.user_id;

    const userAuth = user_id ? true : false;
    const tourspotAuthor = checkTAuthor
        ? user_id === tourspots.find((item) => item._id === tourspotId).author
        : true;

    useEffect(() => {
        if (!userAuth || !tourspotAuthor) {
            enqueueSnackbar('Unauthorized', { variant: 'error' });
        }
    }, [userAuth, tourspotAuthor]);

    // implement 404 page here
    return userAuth && tourspotAuthor ? (
        <Outlet />
    ) : (
        <>
            <Navigate to="/login" state={{ from: location }} replace />
        </>
    );
}

export default RequireAuth;
