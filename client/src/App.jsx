import { Route, Routes } from 'react-router-dom';

import './stylesheets/App.css';

import axios from 'axios';

import Home from './views/Home.jsx';
import IndexPage from './views/IndexPage.jsx';
import Layout from './Layout.jsx';
import Auth from './views/Auth.jsx';
import ShowTourspotPage from './views/ShowTourspotPage.jsx';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
    const nav = {
        home: '/',
        index: '/tourspots',
        login: '/login',
        register: '/register',
        logout: '/logout',
    };

    return (
        <Routes>
            <Route index element={<Home nav={nav} />} />
            <Route path="/" element={<Layout nav={nav} />}>
                <Route path="/tourspots" element={<IndexPage nav={nav} />} />
                <Route
                    path="/tourspots/:tourspotId"
                    element={<ShowTourspotPage />}
                />
                <Route path="/login" element={<Auth action="login" />} />
                <Route path="/register" element={<Auth action="register" />} />
            </Route>
        </Routes>
    );
}

export default App;
