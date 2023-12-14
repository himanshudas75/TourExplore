import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '../stylesheets/Header.css';

import { v4 as uuid } from 'uuid';
import useData from '../hooks/useData.js';

function Header() {
    const navigate = useNavigate();
    const { nav } = useData();

    const pages = [
        { name: 'Home', link: nav.home },
        { name: 'Tourist Spots', link: nav.index },
        { name: 'New Tourist Spot', link: nav.new },
    ];

    const actions = [
        { name: 'Login', link: nav.login },
        { name: 'Register', link: nav.register },
        { name: 'Logout', link: nav.logout },
    ];

    return (
        <AppBar className="Header" position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TourExplore
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                variant="text"
                                key={page.name}
                                onClick={() => navigate(page.link)}
                                sx={{ my: 2, display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'none',
                                md: 'flex',
                                justifyContent: 'flex-end',
                            },
                        }}
                    >
                        {actions.map((action) => (
                            <Button
                                variant="text"
                                key={action.name}
                                onClick={() => navigate(action.link)}
                                sx={{ my: 2, display: 'block' }}
                            >
                                {action.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
