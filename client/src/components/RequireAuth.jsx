import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useData from '../hooks/useData';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageNotFound from '../views/PageNotFound.jsx';

import useTourspots from '../hooks/useTourspots';
import Loading from './Loading.jsx';

function RequireAuth({ checkTAuthor }) {
    const { auth } = useAuth();
    const { nav } = useData();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const { tourspotId } = useParams();
    const { getTourspot } = useTourspots();

    const user_id = auth?.user_id;

    const userAuth = user_id ? true : false;
    const [tourspotAuthor, setTourspotAuthor] = useState({ not_set: true });

    useEffect(() => {
        async function checkTAuth() {
            try {
                const res = await getTourspot(tourspotId);
                if (res) {
                    if (res.success) {
                        const author = res.tourspot.author._id;
                        if (user_id && user_id === author)
                            setTourspotAuthor(true);
                        else setTourspotAuthor(false);
                    } else {
                        if (res.message === 'Tourspot not found')
                            setTourspotAuthor(false);
                        else console.error(res.message);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        if (checkTAuthor) checkTAuth();
        if (!userAuth) {
            enqueueSnackbar('Unauthorized', { variant: 'error' });
        }
    }, [userAuth, tourspotAuthor]);

    if (checkTAuthor) {
        if (userAuth) {
            if (tourspotAuthor?.not_set) return <Loading />;
            if (tourspotAuthor) return <Outlet />;
            else return <PageNotFound />;
        } else {
            return (
                <Navigate to={nav.login} state={{ from: location }} replace />
            );
        }
    } else {
        return userAuth ? (
            <Outlet />
        ) : (
            <Navigate to={nav.login} state={{ from: location }} replace />
        );
    }
}

export default RequireAuth;
