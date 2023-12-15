import axios from '../api/axios';
import useData from './useData';

const useTourspots = () => {
    const { tourspots, setTourspots } = useData();

    const setAllTourspots = async () => {
        try {
            const res = await axios.get('/tourspots');
            setTourspots(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getTourspot = async (tourspotId) => {
        try {
            const res = await axios.get(`/tourspots/${tourspotId}`);
            console.log(res.data.images.map((image) => image.thumbnail));
            return res.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return { setAllTourspots, getTourspot, tourspots };
};

export default useTourspots;
