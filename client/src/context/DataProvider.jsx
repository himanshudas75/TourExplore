import { createContext } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const nav = {
        home: '/',
        index: '/tourspots',
        login: '/login',
        register: '/register',
        logout: '/logout',
        new: '/tourspots/new',
    };

    return (
        <DataContext.Provider value={{ nav }}>{children}</DataContext.Provider>
    );
};

export default DataContext;
