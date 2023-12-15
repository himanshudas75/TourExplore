import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutDialog from './LogoutDialog.jsx';
import ChangePasswordDialog from './ChangePasswordDialog.jsx';
import DeleteDialog from './DeleteDialog.jsx';

import { useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth.js';

function UserSettings() {
    const { auth } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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

    const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
    const openDeleteUserDialog = () => {
        setIsDeleteUserDialogOpen(true);
    };

    const closeDeleteUserDialog = () => {
        setIsDeleteUserDialogOpen(false);
    };

    const settings = [
        { name: 'Change Password', link: openChangePasswordDialog },
        { name: 'Logout', link: openLogoutDialog },
        { name: 'Delete User', link: openDeleteUserDialog },
    ];

    return (
        <Box
            sx={{
                flexGrow: 0,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} className="ms-3 mb-1">
                    <Avatar alt="Avatar" src="/src/assets/avatar.png" />
                </IconButton>
            </Tooltip>
            <Typography variant="p" className="homebar-username ms-2 mb-1">
                {auth?.username}
            </Typography>
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
                    <MenuItem key={setting.name} onClick={setting.link}>
                        <Typography textAlign="center">
                            {setting.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
            <LogoutDialog
                isOpen={isLogoutDialogOpen}
                handleClose={closeLogoutDialog}
            />
            <ChangePasswordDialog
                isOpen={isChangePasswordDialogOpen}
                handleClose={closeChangePasswordDialog}
            />
            <DeleteDialog
                title="Are you sure that you want to delete this user?"
                description="All user data will be deleted. This action cannot be undone."
                isOpen={isDeleteUserDialogOpen}
                handleClose={closeDeleteUserDialog}
            />
        </Box>
    );
}

export default UserSettings;
