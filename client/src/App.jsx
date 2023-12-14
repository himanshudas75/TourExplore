import { Route, Routes } from 'react-router-dom';

import './stylesheets/App.css';

import axios from 'axios';

import Home from './views/Home.jsx';
import IndexPage from './views/IndexPage.jsx';
import Layout from './Layout.jsx';
import Auth from './views/Auth.jsx';
import ShowTourspotPage from './views/ShowTourspotPage.jsx';
import NewTourspot from './views/NewTourspot.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Logout from './components/Logout.jsx';
import EditTourspot from './views/EditTourspot.jsx';

import useData from './hooks/useData.js';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.withCredentials = true;

function App() {
    const { setTourspots } = useData();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function getTourspots() {
            try {
                const res = await axios.get('/tourspots');
                setTourspots(res.data);
                navigate(from, { replace: true });
            } catch (err) {
                var message;
                if (!err?.response) {
                    message = 'No response from server';
                } else message = err.response.data.message;
                enqueueSnackbar(message, { variant: 'error' });
            }
        }
        getTourspots();
    }, []);

    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Layout />}>
                <Route path="/login" element={<Auth action="login" />} />
                <Route path="/register" element={<Auth action="register" />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="tourspots">
                    <Route index element={<IndexPage />} />
                    <Route path=":tourspotId" element={<ShowTourspotPage />} />
                    <Route element={<RequireAuth />}>
                        <Route path="new" element={<NewTourspot />} />
                    </Route>
                    <Route element={<RequireAuth checkTAuthor={true} />}>
                        <Route
                            path=":tourspotId/edit"
                            element={<EditTourspot />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
