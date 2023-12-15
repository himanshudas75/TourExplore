import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTourspots from '../hooks/useTourspots.js';
import NewTourspotForm from '../components/NewTourspotForm';
import EditTourspotForm from '../components/EditTourspotForm';

function TourspotFunction({ action }) {
    const { tourspotId } = useParams();
    const { getTourspot } = useTourspots();
    const [tourspot, setTourspot] = useState(null);

    useEffect(() => {
        async function getData() {
            const t = await getTourspot(tourspotId);
            setTourspot(t);
        }
        if (action === 'edit') getData();
    }, []);

    return (
        <div className="container justify-content-center align-items-center mt-5 mb-5">
            <div className="row">
                <div className="col-md-8 offset-md-3 col-xl-6 offset-xl-3">
                    {action === 'new' ? <NewTourspotForm /> : ''}
                    {action === 'edit' && tourspot ? (
                        <EditTourspotForm tourspot={tourspot} />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

export default TourspotFunction;
