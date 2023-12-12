import { Route, Routes, useNavigate } from 'react-router-dom';
import './stylesheets/App.css';

import Home from './views/Home.jsx';
import IndexPage from './views/IndexPage.jsx';
import Layout from './Layout.jsx';
import Auth from './views/Auth.jsx';

function App() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToIndex = () => {
        navigate('/tourspots');
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    const navigateToLogout = () => {
        navigate('/logout');
    };

    const nav = {
        home: navigateToHome,
        index: navigateToIndex,
        login: navigateToLogin,
        register: navigateToRegister,
        logout: navigateToLogout,
    };

    return (
        <Routes>
            <Route index element={<Home nav={nav} />} />
            <Route path="/" element={<Layout nav={nav} />}>
                <Route path="/tourspots" element={<IndexPage nav={nav} />} />
                <Route path="/login" element={<Auth action="login" />} />
                <Route path="/register" element={<Auth action="register" />} />
            </Route>
        </Routes>
    );
}

export default App;
