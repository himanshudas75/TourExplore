import { createContext, useState } from 'react';
import { useEffect } from 'react';
import axios from '../api/axios';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [tourspots, setTourspots] = useState([]);
    const nav = {
        home: '/',
        index: '/tourspots',
        login: '/login',
        register: '/register',
        logout: '/logout',
        new: '/tourspots/new',
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/tourspots');
                setTourspots(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ nav, tourspots, setTourspots }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
