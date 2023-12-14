import '../stylesheets/IndexPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Map from '../components/Map';
import IndexPageCard from '../components/IndexPageCard';
import useData from '../hooks/useData.js';

function IndexPage() {
    const { tourspots } = useData();

    return (
        <>
            <div className="cluster-map mb-4">
                <Map tourspots={tourspots} scriptName="clusterMap.js" />
            </div>
            <div className="container">
                {tourspots.length ? (
                    tourspots.map((tourspot) => (
                        <IndexPageCard key={tourspot._id} tourspot={tourspot} />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default IndexPage;
