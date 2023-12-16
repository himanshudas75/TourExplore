import useAxiosPrivate from './useAxiosPrivate';

const useTourspots = () => {
    const axiosPrivate = useAxiosPrivate();

    const createReview = async (tourspotId, data) => {
        try {
            const res = await axiosPrivate.post(
                `/tourspots/${tourspotId}/reviews`,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            return res.data;
        } catch (err) {
            console.log(err);
            return err?.response?.data;
        }
    };

    const deleteReview = async (tourspotId, reviewId) => {
        try {
            const res = await axiosPrivate.delete(
                `/tourspots/${tourspotId}/reviews/${reviewId}`,
                {
                    withCredentials: true,
                }
            );
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    return {
        createReview,
        deleteReview,
    };
};

export default useTourspots;
