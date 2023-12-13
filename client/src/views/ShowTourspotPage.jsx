import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ShowTourspotPageCard from '../components/ShowTourspotPageCard';

function ShowTourspotPage() {
    const { tourspotId } = useParams();

    const [tourspot, setTourspot] = useState(null);

    useEffect(() => {
        async function getTourspot() {
            await axios.get(`/tourspots/${tourspotId}`).then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                } else setTourspot(res.data);
            });
        }
        getTourspot();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {tourspot && <ShowTourspotPageCard tourspot={tourspot} />}
                </div>
                <div className="col-md-6"></div>
            </div>
        </div>
    );
}

export default ShowTourspotPage;
