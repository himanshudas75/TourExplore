import axios from '../api/axios';
import useAxiosPrivate from './useAxiosPrivate';

const useTourspots = () => {
    const axiosPrivate = useAxiosPrivate();

    const getAllTourspots = async () => {
        try {
            const res = await axios.get('/tourspots');
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    const getTourspot = async (tourspotId) => {
        try {
            const res = await axios.get(`/tourspots/${tourspotId}`);
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    const createTourspot = async (data) => {
        try {
            const res = await axiosPrivate.post('/tourspots/new', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    const editTourspot = async (tourspotId, data) => {
        try {
            const res = await axiosPrivate.put(
                `/tourspots/${tourspotId}`,
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    const deleteTourspot = async (tourspotId) => {
        try {
            const res = await axiosPrivate.delete(`/tourspots/${tourspotId}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    return {
        getAllTourspots,
        getTourspot,
        createTourspot,
        editTourspot,
        deleteTourspot,
    };
};

export default useTourspots;
