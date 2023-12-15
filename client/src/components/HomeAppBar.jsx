import { useState, useEffect } from 'react';
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
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import LogoutDialog from './LogoutDialog.jsx';
import ChangePasswordDialog from './ChangePasswordDialog.jsx';

import { v4 as uuid } from 'uuid';

import '../stylesheets/HomeAppBar.css';
import useData from '../hooks/useData.js';
import useAuth from '../hooks/useAuth.js';

function HomeAppBar() {
    const navigate = useNavigate();
    const { nav } = useData();
    const { auth } = useAuth();

    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const openLogoutDialog = () => {
        setIsLogoutDialogOpen(true);
    };

    const closeLogoutDialog = () => {
        setIsLogoutDialogOpen(false);
    };

    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
        useState(false);
    const openChangePasswordDialog = () => {
        setIsChangePasswordDialogOpen(true);
    };

    const closeChangePasswordDialog = () => {
        setIsChangePasswordDialogOpen(false);
    };

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

    const settings = [
        { name: 'Change Password', link: openChangePasswordDialog },
        { name: 'Logout', link: openLogoutDialog },
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
                                        onClick={setting.link}
                                    >
                                        <Typography textAlign="center">
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        ''
                    )}
                </Toolbar>
            </Container>
            <LogoutDialog
                isOpen={isLogoutDialogOpen}
                handleClose={closeLogoutDialog}
            />
            <ChangePasswordDialog
                isOpen={isChangePasswordDialogOpen}
                handleClose={closeChangePasswordDialog}
            />
        </AppBar>
    );
}
export default HomeAppBar;
