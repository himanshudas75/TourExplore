import '../stylesheets/IndexPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Map from '../components/Map';
import IndexPageCard from '../components/IndexPageCard';

function IndexPage({ nav }) {
    const [tourspots, setTourspots] = useState([]);

    useEffect(() => {
        async function getTourspots() {
            await axios.get('/tourspots').then((res) => {
                setTourspots(res.data);
            });
        }
        getTourspots();
    }, []);

    return (
        <>
            <div className="cluster-map mb-4">
                <Map tourspots={tourspots} scriptName="clusterMap.js" />
            </div>
            <div className="container">
                {tourspots.length &&
                    tourspots.map((tourspot) => (
                        <IndexPageCard
                            key={tourspot._id}
                            tourspot={tourspot}
                            nav={nav}
                        />
                    ))}
            </div>
        </>
    );
}

export default IndexPage;
