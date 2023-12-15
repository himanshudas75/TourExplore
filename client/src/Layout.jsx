import './stylesheets/Layout.css';

import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
    return (
        <div className="layout">
            <Header />
            <main className="mt-4 me-4 ms-4 mb-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
