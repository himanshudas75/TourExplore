import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './stylesheets/index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './context/AuthProvider';
import { DataProvider } from './context/DataProvider';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <DataProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </DataProvider>
            </SnackbarProvider>
        </BrowserRouter>
    </React.StrictMode>
);
