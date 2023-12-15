import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import LogoutDialog from './LogoutDialog.jsx';
import ChangePasswordDialog from './ChangePasswordDialog.jsx';
import UserSettings from './UserSettings.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '../stylesheets/Header.css';

import { v4 as uuid } from 'uuid';
import useData from '../hooks/useData.js';
import useAuth from '../hooks/useAuth.js';

function Header() {
    const navigate = useNavigate();
    const { nav } = useData();
    const { auth } = useAuth();

    const pages = [
        { name: 'Home', link: nav.home },
        { name: 'Tourist Spots', link: nav.index },
        { name: 'New Tourist Spot', link: nav.new },
    ];

    const actions = [
        { name: 'Login', link: nav.login },
        { name: 'Register', link: nav.register },
    ];

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
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
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={() => navigate(page.link)}
                                >
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                            {!auth?.user_id
                                ? actions.map((action) => (
                                      <MenuItem
                                          key={action.name}
                                          onClick={() => navigate(action.link)}
                                      >
                                          <Typography textAlign="center">
                                              {action.name}
                                          </Typography>
                                      </MenuItem>
                                  ))
                                : ''}
                        </Menu>
                    </Box>

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

                    {auth?.user_id ? (
                        <UserSettings />
                    ) : (
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
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
