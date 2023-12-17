import { useEffect, useState } from 'react';

import useTourspots from '../hooks/useTourspots.js';
import TourspotCardHorizontalStack from '../components/TourspotCardHorizontalStack.jsx';
import DisplayMap from '../components/DisplayMap.jsx';

import { useSnackbar } from 'notistack';
import Loading from '../components/Loading.jsx';

function IndexPage() {
    const { enqueueSnackbar } = useSnackbar();
    const { getAllTourspots } = useTourspots();
    const [tourspots, setTourspots] = useState({ not_set: true });

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getAllTourspots();
                if (res) {
                    if (res.success) {
                        setTourspots(res.tourspots);
                    } else {
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
        fetchData();
    }, []);

    return (
        <>
            {!tourspots?.not_set ? (
                <>
                    <div
                        className="container-flex mb-4 p-0 m-0"
                        style={{ width: '100%', height: '450px' }}
                    >
                        <DisplayMap
                            action="cluster"
                            tourspots={tourspots}
                            div_id="map-cluster"
                        />
                    </div>
                    <div className="container">
                        <TourspotCardHorizontalStack tourspots={tourspots} />
                    </div>
                </>
            ) : (
                <div className="container">
                    <div
                        className="container"
                        style={{
                            height: '500px',
                            width: '500px',
                            position: 'relative',
                        }}
                    >
                        <Loading />
                    </div>
                </div>
            )}
        </>
    );
}

export default IndexPage;
