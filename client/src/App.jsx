import { Route, Routes } from 'react-router-dom';

import './stylesheets/App.css';

import axios from './api/axios';

import Home from './views/Home.jsx';
import IndexPage from './views/IndexPage.jsx';
import Layout from './Layout.jsx';
import Auth from './views/Auth.jsx';
import ShowTourspotPage from './views/ShowTourspotPage.jsx';
import NewTourspotForm from './components/NewTourspotForm.jsx';
import RequireAuth from './components/RequireAuth.jsx';
// import Logout from './components/Logout.jsx';
import EditTourspotForm from './components/EditTourspotForm.jsx';
import PersistLogin from './components/PersistLogin.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import TourspotFunction from './views/TourspotFunction.jsx';

function App() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Layout />}>
                {/* Unprotected routes */}
                <Route element={<Auth />}>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                </Route>
                {/* <Route path="logout" element={<Logout />} /> */}
                <Route path="tourspots" element={<IndexPage />} />
                <Route
                    path="tourspots/:tourspotId"
                    element={<ShowTourspotPage />}
                />

                {/* Protected routes */}
                {/* <Route element={<PersistLogin />}> */}
                {/* <Route element={<RequireAuth />}> */}
                <Route
                    path="tourspots/new"
                    element={<TourspotFunction action="new" />}
                />
                {/* </Route> */}
                {/* <Route element={<RequireAuth checkTAuthor={true} />}> */}
                <Route
                    path="tourspots/:tourspotId/edit"
                    element={<TourspotFunction action="edit" />}
                />
                {/* </Route> */}
                {/* </Route> */}

                {/* catch all */}
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Route>
        </Routes>
    );
}

export default App;
