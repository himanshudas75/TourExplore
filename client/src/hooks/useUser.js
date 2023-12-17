import axios from '../api/axios';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useUser = () => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const login = async (data) => {
        try {
            const res = await axios.post('/login', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            const accessToken = res.data.accessToken;
            const user_id = res.data.user.user_id;
            const username = res.data.user.username;

            setAuth({ user_id, username, accessToken });
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    const register = async (data) => {
        try {
            const res = await axios.post('/register', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            const accessToken = res.data.accessToken;
            const user_id = res.data.user.user_id;
            const username = res.data.user.username;

            setAuth({ user_id, username, accessToken });
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    const changePassword = async (data) => {
        try {
            const res = await axiosPrivate.put(
                '/changePassword',
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    const logout = async () => {
        try {
            const res = await axios.get('/logout', {
                withCredentials: true,
            });
            setAuth({});
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    const deleteUser = async () => {
        try {
            const res = await axiosPrivate.delete('/deleteUser', {
                withCredentials: true,
            });
            setAuth({});
            return res.data;
        } catch (err) {
            return err?.response?.data;
        }
    };

    return { login, register, logout, changePassword, deleteUser };
};

export default useUser;
