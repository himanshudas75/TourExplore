import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTourspots from '../hooks/useTourspots.js';
import TourspotCardVertical from '../components/TourspotCardVertical';
import Map from '../components/Map';
import ReviewForm from '../components/ReviewForm.jsx';
import ReviewCardStack from '../components/ReviewCardStack.jsx';

import '../stylesheets/ShowTourspotPage.css';

function ShowTourspotPage() {
    const { tourspotId } = useParams();
    const { getTourspot } = useTourspots();

    const [tourspot, setTourspot] = useState(null);

    useEffect(() => {
        async function getData() {
            const t = await getTourspot(tourspotId);
            setTourspot(t);
        }
        getData();
    }, []);

    return (
        <div className="container">
            {tourspot ? (
                <div className="row">
                    <div className="col-md-6">
                        <TourspotCardVertical tourspot={tourspot} />
                    </div>
                    <div className="col-md-6">
                        <Map
                            action="map"
                            tourspot={tourspot}
                            scriptName="showPageMap.js"
                        />
                        <div className="mt-3 mb-4">
                            <ReviewForm />
                        </div>
                        <div className="mt-3 mb-4">
                            <ReviewCardStack reviews={tourspot.reviews} />
                        </div>
                    </div>
                </div>
            ) : (
                'Loading...'
            )}
        </div>
    );
}

export default ShowTourspotPage;
