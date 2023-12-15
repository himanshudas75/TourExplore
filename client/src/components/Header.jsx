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

    const settings = [
        { name: 'Change Password', link: '/change' },
        { name: 'Logout', link: nav.logout },
    ];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    className="mb-1 ms-3"
                                >
                                    <Avatar
                                        alt="Avatar"
                                        src="/src/assets/avatar.png"
                                    />
                                    {/* <AccountCircle /> */}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={() => navigate(setting.link)}
                                    >
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
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
