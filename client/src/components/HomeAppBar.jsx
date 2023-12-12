import * as React from 'react';
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

import '../stylesheets/HomeAppBar.css';

function HomeAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar className="home-app-bar" position="static">
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                        href="#app-bar-with-responsive-menu"
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
                            <MenuItem key="1" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem key="1" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    Tourist Spots
                                </Typography>
                            </MenuItem>
                            <MenuItem key="1" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    Login
                                </Typography>
                            </MenuItem>
                            <MenuItem key="1" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    Register
                                </Typography>
                            </MenuItem>
                            <MenuItem key="1" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    Logout
                                </Typography>
                            </MenuItem>
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
                        <Button
                            key="1"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, display: 'block' }}
                            disableRipple
                        >
                            <Typography
                                className="button-text active"
                                textAlign="center"
                            >
                                Home
                            </Typography>
                        </Button>
                        <Button
                            key="1"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, display: 'block' }}
                            disableRipple
                        >
                            <Typography
                                className="button-text"
                                textAlign="center"
                            >
                                Tourist Spots
                            </Typography>
                        </Button>
                        <Button
                            key="1"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, display: 'block' }}
                            disableRipple
                        >
                            <Typography
                                className="button-text"
                                textAlign="center"
                            >
                                Login
                            </Typography>
                        </Button>
                        <Button
                            key="1"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, display: 'block' }}
                            disableRipple
                        >
                            <Typography
                                className="button-text"
                                textAlign="center"
                            >
                                Register
                            </Typography>
                        </Button>
                        <Button
                            key="1"
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, display: 'block' }}
                            disableRipple
                        >
                            <Typography
                                className="button-text"
                                textAlign="center"
                            >
                                Logout
                            </Typography>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default HomeAppBar;
