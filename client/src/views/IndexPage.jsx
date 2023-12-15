import '../stylesheets/IndexPage.css';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

import Map from '../components/Map';
import useTourspots from '../hooks/useTourspots.js';
import TourspotCardHorizontalStack from '../components/TourspotCardHorizontalStack.jsx';

function IndexPage() {
    const { tourspots } = useTourspots();

    return (
        <>
            <div className="cluster-map mb-4">
                <Map
                    action="map-cluster"
                    tourspots={tourspots}
                    scriptName="clusterMap.js"
                />
            </div>
            <div className="container">
                <TourspotCardHorizontalStack tourspots={tourspots} />
            </div>
        </>
    );
}

export default IndexPage;
