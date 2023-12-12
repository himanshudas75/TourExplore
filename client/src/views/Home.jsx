import HomeAppBar from '../components/HomeAppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import '../stylesheets/Home.css';

function Home() {
    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header className="mb-auto">
                <HomeAppBar />
            </header>
            <main className="body-text px-3">
                <h1>TourExplore</h1>
                <p className="lead">
                    Welcome, fellow travel enthusiasts! <br />
                    Uncover hidden treasures and discover fascinating places.
                    <br />
                    Embark on a journey to explore the world like never before!
                </p>
                <Button variant="contained" className="bg-white" size="large">
                    <Typography textAlign="center" className="fw-bold">
                        View Tourist Spots
                    </Typography>
                </Button>
            </main>
            <footer className="mt-auto text-white-50">
                <span>&copy; TourExplore 2023</span>
            </footer>
        </div>
    );
}

export default Home;
