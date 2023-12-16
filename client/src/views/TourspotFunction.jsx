import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTourspots from '../hooks/useTourspots.js';
import NewTourspotForm from '../components/NewTourspotForm';
import EditTourspotForm from '../components/EditTourspotForm';
import Loading from '../components/Loading.jsx';
import { useSnackbar } from 'notistack';
import PageNotFound from './PageNotFound.jsx';
function TourspotFunction({ action }) {
    const { enqueueSnackbar } = useSnackbar();
    const { tourspotId } = useParams();
    const { getTourspot } = useTourspots();
    const [tourspot, setTourspot] = useState({ not_set: true });

    useEffect(() => {
        async function fetchData() {
            const res = await getTourspot(tourspotId);
            try {
                if (res) {
                    if (res.success) {
                        setTourspot(res.tourspot);
                    } else {
                        if (res.message === 'Tourspot not found')
                            setTourspot(null);
                        else
                            enqueueSnackbar(res.message, {
                                variant: 'error',
                            });
                    }
                }
            } catch (err) {
                console.error(err);
                enqueueSnackbar('Something went wrong', {
                    variant: 'error',
                });
            }
        }
        if (action === 'edit') fetchData();
    }, []);

    if (action === 'new') {
        return (
            <div className="container col-md-5 col-xl-5">
                <NewTourspotForm />
            </div>
        );
    } else if (action === 'edit') {
        if (tourspot) {
            if (tourspot?.not_set) {
                return <Loading />;
            } else {
                return (
                    <div className="container col-md-5 col-xl-5">
                        <EditTourspotForm tourspot={tourspot} />
                    </div>
                );
            }
        } else {
            return <PageNotFound />;
        }
    }
}

export default TourspotFunction;
