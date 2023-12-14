import { createContext, useState } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [tourspots, setTourspots] = useState({});
    const nav = {
        home: '/',
        index: '/tourspots',
        login: '/login',
        register: '/register',
        logout: '/logout',
        new: '/tourspots/new',
    };

    return (
        <DataContext.Provider value={{ nav, tourspots, setTourspots }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
