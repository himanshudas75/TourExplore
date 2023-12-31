import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    // const refresh = async () => {
    //     const res = await axios.get('/refresh', { withCredentials: true });
    //     setAuth((prev) => {
    //         return {
    //             ...prev,
    //             user_id: res.data.user.user_id,
    //             username: res.data.user.username,
    //             accessToken: res.data.accessToken,
    //         };
    //     });
    //     return res.data.accessToken;
    // };

    const refresh = async () => {
        try {
            const res = await axios.get('/refresh', { withCredentials: true });
            setAuth((prev) => {
                return {
                    ...prev,
                    user_id: res.data.user.user_id,
                    username: res.data.user.username,
                    accessToken: res.data.accessToken,
                };
            });
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    return refresh;
};

export default useRefreshToken;
