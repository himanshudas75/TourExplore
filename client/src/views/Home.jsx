import { Typography, Button } from '@mui/material';

import HomeAppBar from '../components/HomeAppBar';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Home.css';
import useData from '../hooks/useData.js';

function Home() {
    const navigate = useNavigate();
    const { nav } = useData();

    return (
        <div className="homeDiv d-flex text-center">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="mb-auto">
                    <HomeAppBar />
                </header>
                <main className="body-text px-3">
                    <h1>TourExplore</h1>
                    <p className="lead">
                        Welcome, fellow travel enthusiasts! <br />
                        Uncover hidden treasures and discover fascinating
                        places.
                        <br />
                        Embark on a journey to explore the world like never
                        before!
                    </p>
                    <Button
                        onClick={() => navigate(nav.index)}
                        variant="contained"
                        className="bg-white"
                        size="large"
                    >
                        <Typography textAlign="center" className="fw-bold">
                            View Tourist Spots
                        </Typography>
                    </Button>
                </main>
                <footer className="mt-auto text-white-50">
                    <span>&copy; TourExplore 2023</span>
                </footer>
            </div>
        </div>
    );
}

export default Home;
