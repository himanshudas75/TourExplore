import '../stylesheets/IndexPage.css';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

import useTourspots from '../hooks/useTourspots.js';
import TourspotCardHorizontalStack from '../components/TourspotCardHorizontalStack.jsx';
import DisplayMap from '../components/DisplayMap.jsx';

function IndexPage() {
    const { tourspots } = useTourspots();

    return (
        <>
            <div className="cluster-map mb-4">
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
    );
}

export default IndexPage;
