import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/HomeAppBar.css';
import useData from '../hooks/useData.js';
import useAuth from '../hooks/useAuth.js';

import UserSettings from './UserSettings.jsx';
function HomeAppBar() {
    const navigate = useNavigate();
    const { nav } = useData();
    const { auth } = useAuth();

    const [pages, setPages] = useState([
        { name: 'Home', link: nav.home, active: true, display: true },
        { name: 'Tourist Spots', link: nav.index, display: true },
        { name: 'Login', link: nav.login, display: true },
        { name: 'Register', link: nav.register, display: true },
    ]);

    useEffect(() => {
        if (auth?.user_id) {
            setPages((prevPages) => {
                return prevPages.map((page) =>
                    page.name === 'Login' || page.name === 'Register'
                        ? { ...page, display: false }
                        : page
                );
            });
        }
    }, [auth]);

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar className="homeAppBar" position="static">
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 500,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TourExplore
                    </Typography>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 500,
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
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'flex-end',
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                justifyContent: 'flex-end',
                            }}
                        >
                            {pages.map((page) =>
                                page.display ? (
                                    <MenuItem
                                        key={page.name}
                                        onClick={() => navigate(page.link)}
                                    >
                                        <Typography textAlign="center">
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                ) : (
                                    ''
                                )
                            )}
                        </Menu>
                    </Box>

                    <Box
                        className="menu-buttons"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'flex-end',
                        }}
                    >
                        {pages.map((page) =>
                            page.display ? (
                                <Button
                                    variant="text"
                                    key={page.name}
                                    onClick={() => navigate(page.link)}
                                    sx={{ my: 2, display: 'block' }}
                                    disableRipple
                                >
                                    <Typography
                                        className={`button-text ${
                                            page.active ? 'active' : ''
                                        }`}
                                        textAlign="center"
                                    >
                                        {page.name}
                                    </Typography>
                                </Button>
                            ) : (
                                ''
                            )
                        )}
                    </Box>

                    {auth?.user_id ? <UserSettings /> : ''}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default HomeAppBar;
