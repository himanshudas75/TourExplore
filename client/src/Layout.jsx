import './stylesheets/Layout.css';

import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

function Layout({ nav }) {
    return (
        <div className="layout">
            <Header nav={nav} />
            <main className="mt-4 me-4 ms-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
