import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken.js';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers[
                        'Authorization'
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    try {
                        const res = await refresh();
                        if (res.success) {
                            const newAccessToken = res.accessToken;
                            prevRequest.headers[
                                'Authorization'
                            ] = `Bearer ${newAccessToken}`;
                            return axiosPrivate(prevRequest);
                        } else return Promise.reject(res);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);
    return axiosPrivate;
};

export default useAxiosPrivate;
